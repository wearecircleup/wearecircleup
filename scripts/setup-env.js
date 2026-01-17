import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envTemplate = `# Application Configuration
APP_ENV=development
BASE_URL=http://localhost:5173

# GitHub App Configuration
GITHUB_APP_CLIENT_ID=your_github_app_client_id
GITHUB_APP_REDIRECT_URI=http://localhost:5173/auth/callback

# GitHub Repository
GITHUB_REPO_OWNER=wearecircleup
GITHUB_REPO_NAME=wearecircleup

# GitHub Token (for Actions)
GITHUB_TOKEN=your_github_token
`;

const envExamplePath = path.join(__dirname, '../.env.example');
const envPath = path.join(__dirname, '../.env');

fs.writeFileSync(envExamplePath, envTemplate, 'utf-8');
console.log('[OK] Created .env.example');

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envTemplate, 'utf-8');
  console.log('[OK] Created .env (please update with your values)');
} else {
  console.log('[INFO] .env already exists, skipping creation');
}

console.log('\nEnvironment setup complete.');
console.log('Please update .env with your actual configuration values.');
