import fs from 'fs';
import path from 'path';

async function generateSlides() {
  const MODEL = process.env.MODEL || 'gpt-4o';
  const DESCRIPTION = process.env.DESCRIPTION;
  const NUM_SLIDES = parseInt(process.env.NUM_SLIDES) || 10;
  const LANGUAGE = process.env.LANGUAGE || 'es-LA';
  const THEME = process.env.THEME || 'modern';
  const REQUEST_ID = process.env.REQUEST_ID;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!DESCRIPTION) {
    throw new Error('DESCRIPTION is required');
  }

  // Map model names to correct GitHub Models format
  const modelMap = {
    'gpt-4o': 'openai/gpt-4o',
    'meta-llama/Llama-3.1-70B-Instruct': 'meta/llama-3.1-70b-instruct',
    'microsoft/Phi-3-medium-128k-instruct': 'microsoft/phi-3-medium-128k-instruct'
  };
  
  const githubModel = modelMap[MODEL] || MODEL;
  
  const languageNames = {
    'es-LA': 'español latino',
    'en-US': 'English (US)',
    'pt-BR': 'português brasileiro'
  };
  
  const outputLanguage = languageNames[LANGUAGE] || 'español latino';
  
  console.log(`Generating ${NUM_SLIDES} slides with ${githubModel} in ${outputLanguage}...`);

  // Call GitHub Models API
  const response = await fetch('https://models.github.ai/inference/chat/completions', {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
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
          content: `Create ${NUM_SLIDES} slides about: ${DESCRIPTION}

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

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GitHub Models API error: ${response.status} ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  // Extract JSON from markdown code blocks if present
  const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
  const jsonContent = jsonMatch ? jsonMatch[1] : content;
  
  const slides = JSON.parse(jsonContent);

  // Save to temp file
  const outputPath = `/tmp/slides-${REQUEST_ID}.json`;
  fs.writeFileSync(outputPath, JSON.stringify(slides, null, 2));
  
  console.log(`✓ Generated ${slides.slides.length} slides`);
  console.log(`✓ Saved to ${outputPath}`);
  
  // Set output for next job
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `slides_path=${outputPath}\n`);
}

generateSlides().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
