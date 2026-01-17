import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemas = {
  app: JSON.parse(fs.readFileSync(path.join(__dirname, '../schemas/app.schema.json'), 'utf-8')),
  github: JSON.parse(fs.readFileSync(path.join(__dirname, '../schemas/github.schema.json'), 'utf-8')),
  models: JSON.parse(fs.readFileSync(path.join(__dirname, '../schemas/models.schema.json'), 'utf-8')),
  storage: JSON.parse(fs.readFileSync(path.join(__dirname, '../schemas/storage.schema.json'), 'utf-8'))
};

function validateConfig(configName) {
  const configPath = path.join(__dirname, '../config', `${configName}.config.json`);
  
  if (!fs.existsSync(configPath)) {
    throw new Error(`Config file not found: ${configPath}`);
  }
  
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  
  const validate = ajv.compile(schemas[configName]);
  
  if (!validate(config)) {
    const errors = validate.errors.map(err => {
      return `  - ${err.instancePath || 'root'}: ${err.message}`;
    }).join('\n');
    throw new Error(`Invalid ${configName} config:\n${errors}`);
  }
  
  console.log(`[OK] ${configName}.config.json is valid`);
  return config;
}

function validateAll() {
  const configNames = ['app', 'github', 'models', 'storage'];
  let allValid = true;
  
  console.log('Validating configuration files...\n');
  
  for (const configName of configNames) {
    try {
      validateConfig(configName);
    } catch (error) {
      console.error(`[ERROR] ${error.message}\n`);
      allValid = false;
    }
  }
  
  if (allValid) {
    console.log('\nAll configuration files are valid.');
    process.exit(0);
  } else {
    console.error('\nConfiguration validation failed.');
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  validateAll();
}

export { validateConfig, validateAll };
