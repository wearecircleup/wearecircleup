import fs from 'fs';
import path from 'path';

function buildPresentation() {
  const SLIDES_JSON = process.env.SLIDES_JSON;
  const USERNAME = process.env.USERNAME;
  const SLUG = process.env.SLUG;
  const THEME = process.env.THEME || 'modern';

  if (!SLIDES_JSON || !USERNAME || !SLUG) {
    throw new Error('SLIDES_JSON, USERNAME, and SLUG are required');
  }

  console.log(`Building presentation: ${SLUG}`);

  // Read slides
  const slidesData = JSON.parse(fs.readFileSync(SLIDES_JSON, 'utf8'));
  
  // Create presentation directory
  const presentationDir = path.join(process.cwd(), 'presentations', USERNAME);
  fs.mkdirSync(presentationDir, { recursive: true });

  // Generate HTML
  const html = generateHTML(slidesData, SLUG, THEME);
  
  // Write HTML file
  const htmlPath = path.join(presentationDir, `${SLUG}.html`);
  fs.writeFileSync(htmlPath, html);
  
  console.log(`✓ Presentation built: ${htmlPath}`);
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
