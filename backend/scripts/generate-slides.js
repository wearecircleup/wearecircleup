import fs from 'fs';
import path from 'path';

async function generateSlides() {
  const MODEL = process.env.MODEL || 'gpt-4o';
  const DESCRIPTION = process.env.DESCRIPTION;
  const NUM_SLIDES = parseInt(process.env.NUM_SLIDES) || 10;
  const THEME = process.env.THEME || 'modern';
  const REQUEST_ID = process.env.REQUEST_ID;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!DESCRIPTION) {
    throw new Error('DESCRIPTION is required');
  }

  console.log(`Generating ${NUM_SLIDES} slides with ${MODEL}...`);

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
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: 'Eres un experto en crear presentaciones profesionales. Genera contenido estructurado en formato JSON.'
        },
        {
          role: 'user',
          content: `Crea ${NUM_SLIDES} diapositivas sobre: ${DESCRIPTION}. 
          
Responde SOLO con un JSON válido en este formato:
{
  "slides": [
    {
      "title": "Título de la diapositiva",
      "content": ["Punto 1", "Punto 2", "Punto 3"],
      "notes": "Notas del presentador (opcional)"
    }
  ]
}`
        }
      ],
      temperature: 0.7,
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
