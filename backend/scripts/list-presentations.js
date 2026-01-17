import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * List all presentations for a given user
 * Usage: node backend/scripts/list-presentations.js <username>
 */
function listPresentations() {
  const username = process.argv[2];
  
  if (!username) {
    console.error('Usage: node list-presentations.js <username>');
    process.exit(1);
  }

  const rootDir = path.join(__dirname, '..', '..');
  const metadataDir = path.join(rootDir, 'presentations', 'metadata', username);

  if (!fs.existsSync(metadataDir)) {
    console.log(`No presentations found for user: ${username}`);
    return;
  }

  const files = fs.readdirSync(metadataDir).filter(f => f.endsWith('.yaml'));
  
  if (files.length === 0) {
    console.log(`No presentations found for user: ${username}`);
    return;
  }

  console.log(`\nPresentations for ${username}:\n`);
  
  files.forEach(file => {
    const content = fs.readFileSync(path.join(metadataDir, file), 'utf8');
    const lines = content.split('\n');
    const metadata = {};
    
    lines.forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        metadata[key.trim()] = valueParts.join(':').trim().replace(/^"|"$/g, '');
      }
    });
    
    console.log(`  ${metadata.title || 'Untitled'}`);
    console.log(`    ID: ${metadata.id}`);
    console.log(`    Theme: ${metadata.theme}`);
    console.log(`    Slides: ${metadata.slides_count}`);
    console.log(`    Created: ${metadata.created_at}`);
    console.log(`    URL: https://circleup.com.co${metadata.url}`);
    console.log('');
  });
}

listPresentations();
