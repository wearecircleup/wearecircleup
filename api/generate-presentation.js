/**
 * Vercel Serverless Function: Generate Presentation
 * 
 * Calls GitHub Models API to generate slides and returns JSON
 * This replaces the GitHub Actions workflow for LLM generation
 */

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

    // Return slides data
    return res.status(200).json({
      success: true,
      slides: slidesData.slides,
      metadata: {
        title: title || description.substring(0, 50),
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
