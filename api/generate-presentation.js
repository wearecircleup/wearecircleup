/**
 * Vercel Serverless Function: Generate Presentation
 * 
 * Calls GitHub Models API to generate slides and saves to DynamoDB
 */

import { PresentationService } from '../backend/services/presentation.service.js';
import crypto from 'crypto';

export default async function handler(req, res) {
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
            content: `You are an expert in creating professional presentations. Generate structured content in JSON format. Always respond in ${outputLanguage}.`
          },
          {
            role: 'user',
            content: `Create ${slideCount} slides about: ${description}

IMPORTANT: All content must be in ${outputLanguage}.
          
Respond ONLY with valid JSON in this format:
{
  "slides": [
    {
      "title": "Slide title",
      "content": ["Point 1", "Point 2", "Point 3"]
    }
  ]
}

Do NOT include speaker notes. Only title and content array for each slide.`
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

    // Generate HTML presentation
    const presentationTitle = title || description.substring(0, 50);
    const html = generateHTML(slidesData, presentationTitle, selectedTheme);

    console.log(`[${user.login}] HTML generated successfully`);

    // Generate presentation ID
    const presentationId = crypto.randomUUID();
    const userId = user.id || user.node_id;

    // Save to DynamoDB
    try {
      await PresentationService.savePresentation({
        presentationId: presentationId,
        userId: userId,
        title: presentationTitle,
        description: description,
        slides: slidesData.slides,
        html: html,
        metadata: {
          theme: selectedTheme,
          model: selectedModel,
          language: selectedLanguage,
          slideCount: slidesData.slides.length,
          username: user.login
        }
      });

      console.log(`[${user.login}] Presentation saved to DynamoDB: ${presentationId}`);
    } catch (saveError) {
      console.error(`[${user.login}] Error saving to DynamoDB:`, saveError);
      return res.status(500).json({ 
        error: 'Failed to save presentation',
        details: saveError.message 
      });
    }

    // Return slides data and HTML
    return res.status(200).json({
      success: true,
      presentationId: presentationId,
      slides: slidesData.slides,
      html: html,
      url: `/presentation/${presentationId}`,
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

function generateHTML(slidesData, title, theme) {
  const slides = slidesData.slides.map((slide, index) => {
    const x = (index % 3) * 1200;
    const y = Math.floor(index / 3) * 800;
    const rotate = index % 2 === 0 ? 0 : 15;
    
    return `
    <div class="step slide" data-x="${x}" data-y="${y}" data-rotate="${rotate}">
      <h2>${slide.title}</h2>
      <div class="content">
        ${slide.content.map(point => `<p>• ${point}</p>`).join('\n        ')}
      </div>
      ${slide.notes ? `<div class="notes">${slide.notes}</div>` : ''}
    </div>`;
  }).join('\n');

  const themeColors = {
    modern: { bg: '#0E0C15', primary: '#AC6AFF', secondary: '#FFC876' },
    academic: { bg: '#1a1a1a', primary: '#4a90e2', secondary: '#e8e8e8' },
    minimal: { bg: '#ffffff', primary: '#333333', secondary: '#666666' }
  };
  
  const colors = themeColors[theme] || themeColors.modern;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - CircleUp</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/impress.js@2.0.0/css/impress-common.css">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: ${colors.bg};
      color: ${theme === 'minimal' ? colors.primary : '#ffffff'};
      overflow: hidden;
    }
    
    .step {
      width: 1000px;
      padding: 60px;
      background: ${theme === 'minimal' ? '#f5f5f5' : 'rgba(255, 255, 255, 0.05)'};
      border: 2px solid ${colors.primary};
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
    }
    
    .step h2 {
      color: ${colors.primary};
      font-size: 3em;
      margin-bottom: 0.5em;
      font-weight: bold;
      background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .step .content p {
      font-size: 1.5em;
      line-height: 1.6;
      margin: 0.5em 0;
      color: ${theme === 'minimal' ? colors.secondary : '#e0e0e0'};
    }
    
    .step .notes {
      margin-top: 2em;
      padding: 1em;
      background: rgba(0, 0, 0, 0.2);
      border-left: 4px solid ${colors.secondary};
      font-size: 1em;
      font-style: italic;
      color: ${colors.secondary};
    }
    
    .impress-enabled .step {
      opacity: 0.3;
      transition: opacity 1s;
    }
    
    .impress-enabled .step.active {
      opacity: 1;
    }
    
    .branding {
      position: fixed;
      bottom: 20px;
      right: 20px;
      font-size: 0.8em;
      color: ${colors.secondary};
      opacity: 0.5;
      z-index: 1000;
    }
  </style>
</head>
<body>
  <div id="impress">
    ${slides}
    
    <div class="step" data-x="${Math.ceil(slidesData.slides.length / 3) * 1200}" data-y="0" data-scale="2">
      <h2>Gracias</h2>
      <div class="content">
        <p>Presentacion generada con CircleUp AI</p>
        <p style="font-size: 0.8em; color: ${colors.secondary};">Powered by GitHub Models</p>
      </div>
    </div>
  </div>
  
  <div class="branding">CircleUp</div>
  
  <script src="https://cdn.jsdelivr.net/npm/impress.js@2.0.0/js/impress.js"></script>
  <script>
    impress().init();
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        impress().goto(0);
      }
    });
  </script>
</body>
</html>`;
}
