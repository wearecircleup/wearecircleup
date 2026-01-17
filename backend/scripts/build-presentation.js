import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function buildPresentation() {
  try {
    const SLIDES_JSON = process.env.SLIDES_JSON;
    const USERNAME = process.env.USERNAME;
    const PRESENTATION_ID = process.env.PRESENTATION_ID;
    const TITLE = process.env.TITLE;
    const THEME = process.env.THEME || 'modern';
    const MODEL = process.env.MODEL || 'gpt-4o';

    console.log('Environment variables:');
    console.log(`  SLIDES_JSON: ${SLIDES_JSON}`);
    console.log(`  USERNAME: ${USERNAME}`);
    console.log(`  PRESENTATION_ID: ${PRESENTATION_ID}`);
    console.log(`  TITLE: ${TITLE}`);
    console.log(`  THEME: ${THEME}`);
    console.log(`  MODEL: ${MODEL}`);

    if (!SLIDES_JSON || !USERNAME || !PRESENTATION_ID || !TITLE) {
      throw new Error('SLIDES_JSON, USERNAME, PRESENTATION_ID, and TITLE are required');
    }

    console.log(`\nBuilding presentation: ${PRESENTATION_ID}`);

    // Check if file exists
    if (!fs.existsSync(SLIDES_JSON)) {
      throw new Error(`Slides file not found: ${SLIDES_JSON}`);
    }

    // Read slides
    console.log(`Reading slides from: ${SLIDES_JSON}`);
    const slidesData = JSON.parse(fs.readFileSync(SLIDES_JSON, 'utf8'));
    console.log(`Loaded ${slidesData.slides.length} slides`);
  
  const rootDir = path.join(__dirname, '..', '..');
  
  // Create directory structure
  const metadataDir = path.join(rootDir, 'presentations', 'metadata', USERNAME);
  const contentDir = path.join(rootDir, 'presentations', 'content', USERNAME);
  const publicDir = path.join(rootDir, 'presentations', 'public', USERNAME);
  
  fs.mkdirSync(metadataDir, { recursive: true });
  fs.mkdirSync(contentDir, { recursive: true });
  fs.mkdirSync(publicDir, { recursive: true });

  // Save metadata (YAML format)
  const metadata = `id: ${PRESENTATION_ID}
title: "${TITLE}"
author: ${USERNAME}
theme: ${THEME}
model: ${MODEL}
slides_count: ${slidesData.slides.length}
created_at: ${new Date().toISOString()}
status: completed
url: /presentations/public/${USERNAME}/${PRESENTATION_ID}.html
`;
  
  fs.writeFileSync(
    path.join(metadataDir, `${PRESENTATION_ID}.yaml`),
    metadata
  );
  
  // Save content (JSON format)
  fs.writeFileSync(
    path.join(contentDir, `${PRESENTATION_ID}.json`),
    JSON.stringify(slidesData, null, 2)
  );

  // Generate and save HTML
  const html = generateHTML(slidesData, TITLE, THEME);
  fs.writeFileSync(
    path.join(publicDir, `${PRESENTATION_ID}.html`),
    html
  );
  
  console.log(`\n✓ Presentation built successfully!`);
  console.log(`  Metadata: presentations/metadata/${USERNAME}/${PRESENTATION_ID}.yaml`);
  console.log(`  Content: presentations/content/${USERNAME}/${PRESENTATION_ID}.json`);
  console.log(`  HTML: presentations/public/${USERNAME}/${PRESENTATION_ID}.html`);
  console.log(`\nFiles created in: ${rootDir}`);
  
  // Verify files exist
  const metadataExists = fs.existsSync(path.join(metadataDir, `${PRESENTATION_ID}.yaml`));
  const contentExists = fs.existsSync(path.join(contentDir, `${PRESENTATION_ID}.json`));
  const htmlExists = fs.existsSync(path.join(publicDir, `${PRESENTATION_ID}.html`));
  
  console.log(`\nVerification:`);
  console.log(`  Metadata file exists: ${metadataExists}`);
  console.log(`  Content file exists: ${contentExists}`);
  console.log(`  HTML file exists: ${htmlExists}`);
  
  if (!metadataExists || !contentExists || !htmlExists) {
    throw new Error('Some files were not created successfully');
  }
  
  } catch (error) {
    console.error('\n❌ Error building presentation:');
    console.error(error);
    process.exit(1);
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
    
    /* CircleUp branding */
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
    
    <!-- Final slide -->
    <div class="step" data-x="${Math.ceil(slidesData.slides.length / 3) * 1200}" data-y="0" data-scale="2">
      <h2>¡Gracias!</h2>
      <div class="content">
        <p>Presentación generada con CircleUp AI</p>
        <p style="font-size: 0.8em; color: ${colors.secondary};">Powered by GitHub Models</p>
      </div>
    </div>
  </div>
  
  <div class="branding">CircleUp</div>
  
  <script src="https://cdn.jsdelivr.net/npm/impress.js@2.0.0/js/impress.js"></script>
  <script>
    impress().init();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        impress().goto(0);
      }
    });
  </script>
</body>
</html>`;
}

buildPresentation();
