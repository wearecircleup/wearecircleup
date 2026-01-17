const fs = require('fs');
const path = require('path');

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
  const slides = slidesData.slides.map((slide, index) => `
    <section>
      <h2>${slide.title}</h2>
      ${slide.content.map(point => `<p>• ${point}</p>`).join('\n      ')}
      ${slide.notes ? `<aside class="notes">${slide.notes}</aside>` : ''}
    </section>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - CircleUp</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.6.0/dist/reveal.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.6.0/dist/theme/${theme === 'academic' ? 'serif' : theme === 'minimal' ? 'simple' : 'black'}.css">
  <style>
    .reveal h2 { color: #AC6AFF; }
    .reveal p { text-align: left; margin: 0.5em 0; }
  </style>
</head>
<body>
  <div class="reveal">
    <div class="slides">
      ${slides}
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.6.0/dist/reveal.js"></script>
  <script>
    Reveal.initialize({
      hash: true,
      transition: 'slide',
      controls: true,
      progress: true,
      center: true
    });
  </script>
</body>
</html>`;
}

buildPresentation();
