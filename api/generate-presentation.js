/**
 * Vercel Serverless Function: Generate Presentation
 * 
 * Calls GitHub Models API to generate slides and saves to DynamoDB
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { awsCredentialsProvider } from '@vercel/functions/oidc';
import crypto from 'crypto';

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

    // Call GitHub Models API
    const llmResponse = await fetch('https://models.github.ai/inference/chat/completions', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${process.env.GH_TOKEN_MODELS}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: githubModel,
        messages: [
          {
            role: 'system',
            content: `You are an expert in creating impactful professional presentations focused on key messages rather than information overload. Generate structured content in JSON format. Always respond in ${outputLanguage}.`
          },
          {
            role: 'user',
            content: `Create ${slideCount} slides about: ${description}

IMPORTANT: All content must be in ${outputLanguage}.

PRESENTATION PHILOSOPHY:
- Focus on key messages that the audience will remember after the presentation
- Reduce cognitive load by avoiding bullet points
- Each slide should have ONE clear, impactful message

Respond ONLY with valid JSON in this format:
{
  "slides": [
    {
      "message": "Main impactful message (5-10 words maximum)",
      "explanation": "Complementary paragraph that explains or supports the message (30-50 words, will be displayed in italic)"
    }
  ]
}

RULES FOR ARTISTIC TYPOGRAPHY:
- "message": Must be 5-10 words maximum. This is the key takeaway that occupies 70% of the slide.
  
  TYPOGRAPHY SYSTEM (combine size + weight for dramatic impact):
  * Use pipe | to separate size and weight: |size:weight|word|
  * Sizes: sm (small), md (medium/default), lg (large), xl (extra large)
  * Weights: thin (100), light (300), normal (400), medium (500), bold (700), black (900)
  
  CRITICAL RULES:
  * MAXIMUM 2 words can use large sizes (lg or xl) - these are your hero words
  * ALL other words MUST use sm or md only
  * NEVER use lg or xl on articles (el, la, los, las, un, una, de, del, en, es, por, para, con, sin, y, o)
  * Articles and prepositions MUST be sm or md
  * Reserve lg and xl ONLY for the most important words
  
  EXAMPLES:
  * "La |xl:black|deforestación| del |lg:bold|Amazonas| es una crisis global" ✓ CORRECT
  * "visualize your |xl:black|big| thoughts" ✓ CORRECT (only 1 lg/xl word)
  * "|sm:light|A| symbol |sm:light|of| |lg:bold|sustainability| and |lg:bold|tradition|" ✓ CORRECT (2 lg words max)
  
  DESIGN PHILOSOPHY:
  * Supporting words (articles, prepositions): |sm:light| or |sm:thin| - keep them small
  * Regular words: |md:normal| or no marker (default)
  * Hero words (MAX 2): |lg:bold|, |lg:black|, |xl:bold|, or |xl:black|
  * Create CONTRAST: small words make big words stand out
  
  MANDATORY:
  * Mark at least 3-5 words with size/weight combinations
  * Use |sm:light| or |sm:thin| for articles and prepositions
  * Use lg or xl for MAXIMUM 2 words (the most important ones)
  * Default unmarked words are |md:normal|

- "explanation": STRICT LIMIT 15-20 words. Brief, impactful statement in italic. NOT a paragraph - keep it SHORT and PUNCHY.
- NO bullet points, NO lists
- Focus on DRAMATIC visual hierarchy through size AND weight variations
- Think TEDx style: slides are visual support, NOT reading material
- Each message should be memorable, conversational, and visually striking
- The audience should FEEL the message, not read it

CRITICAL: 
- "explanation" must be EXACTLY 15-20 words (count them!)
- Shorter is better - make every word count
- This is a visual aid for a speaker, not a document

Do NOT include any other fields. Only "message" and "explanation" for each slide.`
          }
        ],
        temperature: 0.4,
        max_tokens: 4000
      })
    });

    if (!llmResponse.ok) {
      const error = await llmResponse.text();
      console.error(`[${user.login}] GitHub Models API error:`, error);
      return res.status(500).json({ 
        error: 'Failed to generate slides with AI',
        details: `API returned ${llmResponse.status}`
      });
    }

    const data = await llmResponse.json();
    const content = data.choices[0].message.content;
    
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
          username: user.login
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
