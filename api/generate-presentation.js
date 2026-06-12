/**
 * Vercel Serverless Function: Generate Presentation
 * 
 * Calls GitHub Models API to generate slides and saves to DynamoDB
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { awsCredentialsProvider } from '@vercel/functions/oidc';
import crypto from 'crypto';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

const MODELS_ENDPOINT = 'https://models.github.ai/inference/chat/completions';
const BEDROCK_FALLBACK_MODEL = 'us.anthropic.claude-sonnet-4-6';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Single call to the GitHub Models API for a given model.
 * Returns { ok, status, content?, errorBody?, model }.
 */
async function callModelsAPI({ model, messages, token }) {
  const resp = await fetch(MODELS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model, messages, temperature: 0.3, max_tokens: 4000 })
  });

  if (!resp.ok) {
    const errorBody = await resp.text().catch(() => '');
    return { ok: false, status: resp.status, errorBody, model };
  }

  const data = await resp.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    return { ok: false, status: resp.status, errorBody: 'Empty content from model', model };
  }
  return { ok: true, status: resp.status, content, model };
}

/**
 * Calls a model with exponential backoff retries for transient errors (429, 5xx, network).
 */
async function callWithRetry({ model, messages, token, logPrefix, maxRetries = 2 }) {
  let last;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      last = await callModelsAPI({ model, messages, token });
    } catch (networkErr) {
      last = { ok: false, status: 0, errorBody: networkErr.message, model };
    }
    if (last.ok) return last;

    const transient = last.status === 429 || last.status >= 500 || last.status === 0;
    if (!transient || attempt === maxRetries) return last;

    const backoff = 1000 * Math.pow(2, attempt); // 1s, 2s
    console.warn(`[${logPrefix}] Transient error (status=${last.status}) on ${model}. Retry ${attempt + 1}/${maxRetries} in ${backoff}ms`);
    await sleep(backoff);
  }
  return last;
}

/**
 * Tries each GitHub Models model in order. Aborts early on auth errors (401/403),
 * since no alternative model will succeed with an invalid token.
 */
async function generateSlidesWithFallback({ models, messages, token, logPrefix }) {
  let last;
  for (const model of models) {
    last = await callWithRetry({ model, messages, token, logPrefix });
    if (last.ok) {
      if (model !== models[0]) {
        console.warn(`[${logPrefix}] Primary model failed; succeeded with fallback model: ${model}`);
      }
      return last;
    }
    if (last.status === 401 || last.status === 403) break;
    console.warn(`[${logPrefix}] Model ${model} failed (status=${last.status}). Trying next fallback model...`);
  }
  return last || { ok: false, status: 0, errorBody: 'No models attempted', model: null };
}

/**
 * Secondary provider: AWS Bedrock (Claude Sonnet 4.6 via inference profile).
 * Uses the same Vercel OIDC credentials as DynamoDB. Converts the OpenAI-style
 * messages into the Anthropic Messages format expected by Bedrock.
 */
async function callBedrockFallback({ messages, logPrefix }) {
  try {
    const systemMessage = messages.find((m) => m.role === 'system')?.content || '';
    const userMessages = messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({ role: m.role, content: m.content }));

    const bedrock = new BedrockRuntimeClient({
      region: process.env.AWS_REGION,
      credentials: awsCredentialsProvider({
        roleArn: process.env.AWS_ROLE_ARN,
        clientConfig: { region: process.env.AWS_REGION },
      }),
    });

    const command = new InvokeModelCommand({
      modelId: BEDROCK_FALLBACK_MODEL,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 4000,
        temperature: 0.3,
        system: systemMessage,
        messages: userMessages
      })
    });

    const response = await bedrock.send(command);
    const decoded = JSON.parse(new TextDecoder().decode(response.body));
    const content = decoded?.content?.[0]?.text;
    if (!content) {
      return { ok: false, status: 502, errorBody: 'Empty content from Bedrock', model: BEDROCK_FALLBACK_MODEL };
    }
    console.warn(`[${logPrefix}] Generated via Bedrock fallback (${BEDROCK_FALLBACK_MODEL})`);
    return { ok: true, status: 200, content, model: BEDROCK_FALLBACK_MODEL };
  } catch (err) {
    console.error(`[${logPrefix}] Bedrock fallback failed:`, err);
    return { ok: false, status: 0, errorBody: err.message, model: BEDROCK_FALLBACK_MODEL };
  }
}

/**
 * Maps an LLM failure into a user-friendly, actionable error response.
 */
function mapLlmError(result) {
  const status = result?.status;
  if (status === 401 || status === 403) {
    return {
      httpStatus: 502,
      code: 'AI_AUTH_FAILED',
      error: 'El servicio de IA no está disponible temporalmente. Inténtalo más tarde.',
      details: 'GitHub Models rechazó la autenticación (token GH_TOKEN_MODELS inválido o expirado).'
    };
  }
  if (status === 429) {
    return {
      httpStatus: 429,
      code: 'AI_RATE_LIMITED',
      error: 'Se alcanzó el límite de uso de la IA. Intenta de nuevo en unos minutos.',
      details: 'GitHub Models devolvió 429 (rate limit) en todos los modelos disponibles.'
    };
  }
  if (status === 400 || status === 404) {
    return {
      httpStatus: 502,
      code: 'AI_MODEL_UNAVAILABLE',
      error: 'El modelo de IA seleccionado no está disponible. Intenta con otro modelo.',
      details: `GitHub Models devolvió ${status} para todos los modelos probados.`
    };
  }
  return {
    httpStatus: 502,
    code: 'AI_UNAVAILABLE',
    error: 'Failed to generate slides with AI',
    details: `API returned ${status ?? 'network error'}`
  };
}

export default async function handler(req, res) {
  // Initialize DynamoDB client with Vercel OIDC credentials
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: awsCredentialsProvider({
      roleArn: process.env.AWS_ROLE_ARN,
      clientConfig: { region: process.env.AWS_REGION },
    }),
  });
  const docClient = DynamoDBDocumentClient.from(client);
  const PRESENTATIONS_TABLE = process.env.DYNAMODB_PRESENTATIONS_TABLE_NAME;
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title, description, slides: numSlides, model, language, theme, user } = req.body;

    // Validation
    if (!description || !user || !user.login) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const slideCount = parseInt(numSlides) || 10;
    const selectedModel = model || 'gpt-4o';
    const selectedLanguage = language || 'es-LA';
    const selectedTheme = theme || 'modern';

    // Map model names to GitHub Models format
    const modelMap = {
      'gpt-4o': 'openai/gpt-4o',
      'meta-llama/Llama-3.1-70B-Instruct': 'meta/llama-3.1-70b-instruct',
      'microsoft/Phi-3-medium-128k-instruct': 'microsoft/phi-3-medium-128k-instruct'
    };
    
    const githubModel = modelMap[selectedModel] || selectedModel;
    
    const languageNames = {
      'es-LA': 'español latino',
      'en-US': 'English (US)',
      'pt-BR': 'português brasileiro'
    };
    
    const outputLanguage = languageNames[selectedLanguage] || 'español latino';

    console.log(`[${user.login}] Generating ${slideCount} slides with ${githubModel} in ${outputLanguage}`);

    // Build the prompt messages (provider-agnostic, reused across all fallback attempts)
    const messages = [
          {
            role: 'system',
            content: `You are an expert in creating impactful professional presentations. Your tone must always be humble, professional, respectful, coherent, pleasant, and above all, incredible and interesting. Focus on key messages rather than information overload. Generate structured content in JSON format. Always respond in ${outputLanguage}.`
          },
          {
            role: 'user',
            content: `Create ${slideCount} slides about: ${description}

IMPORTANT: All content must be in ${outputLanguage}.

PRESENTATION PHILOSOPHY:
- Use humble, professional, respectful, and coherent language
- Make content pleasant, incredible, and genuinely interesting
- Focus on key messages that the audience will remember after the presentation
- Reduce cognitive load by avoiding bullet points
- Each slide should have ONE clear, impactful message
- Avoid exaggerations or sensationalism - be authentic and credible

Respond ONLY with valid JSON in this format:
{
  "slides": [
    {
      "message": "Main impactful message (3-8 words maximum)",
      "explanation": "Complementary paragraph that explains or supports the message (30-50 words exactly, will be displayed in italic)"
    }
  ]
}

RULES FOR AWWWARDS-STYLE TYPOGRAPHY:
- "message": Must be 3-8 words maximum. Short, punchy, memorable. Think billboard, not paragraph.
  
  MINIMALIST TYPOGRAPHY SYSTEM (Inspired by Awwwards winners):
  * Use pipe | to mark ONLY 1-2 hero words: |lg:black|word|
  * ALL other words are automatically |md:light| - creating elegant contrast
  * Maximum 2 words can be |lg:black| - restraint is key
  
  CRITICAL RULES FOR AWARD-WINNING DESIGN:
  * Default: Most words are light weight - creates breathing room and sophistication
  * Hero words: Mark 1-2 POWER words with |lg:black| - your visual anchors
  * NEVER mark: articles, prepositions, conjunctions (el, la, de, en, y, o, etc.)
  * ONLY mark: The most impactful NOUNS or ACTION VERBS
  * Shorter is better: 3-5 words is ideal, 8 is absolute maximum
  
  EXAMPLES (Awwwards-inspired):
  * "|lg:black|Innovación| que transforma" ✓ PERFECT - 3 words, 1 hero
  * "El |lg:black|futuro| es |lg:black|ahora|" ✓ GOOD - 4 words, 2 heroes
  * "|lg:black|Diseño| minimalista y |lg:black|poderoso|" ✓ GOOD - 4 words, 2 heroes
  * "Creamos |lg:black|experiencias| memorables" ✓ PERFECT - 3 words, 1 hero
  
  DESIGN PHILOSOPHY (Like creativewebmanual.com):
  * Extreme simplicity: fewer words = more impact
  * Visual hierarchy: light base + bold accents = sophistication
  * Breathing room: generous spacing makes text feel premium
  * No clutter: if it doesn't add value, remove it
  * Think: "What would Apple/Awwwards do?" - then simplify more

- "explanation": 30-50 words. Count each word carefully - this is CRITICAL. Brief, impactful statement in italic that complements the message.
- NO bullet points, NO lists
- Focus on subtle visual hierarchy through the 2 keyword highlights
- Think TEDx style: slides are visual support, NOT reading material
- Each message should be memorable, conversational, and visually striking
- The audience should FEEL the message, not read it

CRITICAL VALIDATION: 
- Count the words in "explanation" - must be MINIMUM 20 words, MAXIMUM 30 words
- If you generate less than 20 words, ADD more context
- If you generate more than 30 words, REMOVE unnecessary words
- This is NOT negotiable - the system will reject slides with wrong word count

Do NOT include any other fields. Only "message" and "explanation" for each slide.`
          }
    ];

    // Provider 1: GitHub Models (selected model first, then known fallbacks, deduplicated)
    const fallbackModels = [githubModel, ...Object.values(modelMap)]
      .filter((m, i, arr) => arr.indexOf(m) === i);

    const llmResult = await generateSlidesWithFallback({
      models: fallbackModels,
      messages,
      token: process.env.GH_TOKEN_MODELS,
      logPrefix: user.login
    });

    let content;
    let providerUsed;
    if (llmResult.ok) {
      content = llmResult.content;
      providerUsed = `github:${llmResult.model}`;
    } else {
      // Provider 2: AWS Bedrock (Claude Sonnet 4.6) as fallback
      console.warn(`[${user.login}] GitHub Models chain failed (status=${llmResult.status}). Falling back to Bedrock...`);
      const bedrockResult = await callBedrockFallback({ messages, logPrefix: user.login });
      if (bedrockResult.ok) {
        content = bedrockResult.content;
        providerUsed = `bedrock:${bedrockResult.model}`;
      } else {
        console.error(`[${user.login}] All providers failed. github=${llmResult.status} bedrock=${bedrockResult.status} body=`, bedrockResult.errorBody);
        const mapped = mapLlmError(llmResult);
        return res.status(mapped.httpStatus).json({
          error: mapped.error,
          details: `${mapped.details} El fallback de Bedrock tambien fallo (${bedrockResult.status}).`,
          code: mapped.code
        });
      }
    }

    console.log(`[${user.login}] Slides generated via ${providerUsed}`);
    
    // Extract JSON from markdown code blocks if present
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
    const jsonContent = jsonMatch ? jsonMatch[1] : content;
    
    let slidesData;
    try {
      slidesData = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error(`[${user.login}] Failed to parse LLM response:`, jsonContent);
      return res.status(500).json({ 
        error: 'Failed to parse AI response',
        details: 'Invalid JSON format from AI model'
      });
    }

    console.log(`[${user.login}] Generated ${slidesData.slides.length} slides successfully`);

    // Generate presentation ID
    const presentationTitle = title || description.substring(0, 50);
    const presentationId = crypto.randomUUID();
    const userId = user.id || user.node_id;

    // Save to DynamoDB presentations table
    const timestamp = new Date().toISOString();
    
    try {
      // Get current presentations for user
      console.log(`[${user.login}] Fetching presentations for user ${userId}...`);
      const current = await docClient.send(new GetCommand({
        TableName: PRESENTATIONS_TABLE,
        Key: { PK: userId }
      }));
      
      const presentations = current.Item?.presentations || [];
      console.log(`[${user.login}] Current presentations count: ${presentations.length}`);
      
      // Add new presentation (JSON only, no HTML)
      const newPresentation = {
        id: presentationId,
        title: presentationTitle,
        description: description,
        slides: slidesData.slides,
        metadata: {
          theme: selectedTheme,
          model: selectedModel,
          language: selectedLanguage,
          slideCount: slidesData.slides.length,
          username: user.login,
          provider: providerUsed
        },
        status: 'completed',
        createdAt: timestamp,
        updatedAt: timestamp
      };
      
      presentations.unshift(newPresentation);
      console.log(`[${user.login}] New presentation added. Total count: ${presentations.length}`);
      
      // Save all presentations for user
      await docClient.send(new PutCommand({
        TableName: PRESENTATIONS_TABLE,
        Item: {
          PK: userId,
          userId: userId,
          presentations: presentations,
          updatedAt: timestamp
        }
      }));

      console.log(`[${user.login}] ✅ Presentation saved successfully: ${presentationId}`);
    } catch (saveError) {
      console.error(`[${user.login}] ❌ Error saving to DynamoDB:`, saveError);
      return res.status(500).json({ 
        error: 'Failed to save presentation',
        details: saveError.message,
        errorName: saveError.name
      });
    }

    // Return slides data only (no HTML)
    return res.status(200).json({
      success: true,
      presentationId: presentationId,
      slides: slidesData.slides,
      metadata: {
        title: presentationTitle,
        theme: selectedTheme,
        model: selectedModel,
        language: selectedLanguage,
        slideCount: slidesData.slides.length
      }
    });

  } catch (error) {
    console.error('Error generating presentation:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}

export { callModelsAPI, callWithRetry, generateSlidesWithFallback, callBedrockFallback, mapLlmError };
