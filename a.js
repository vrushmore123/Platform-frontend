import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directories = [
  'public',
  'src/assets',
  'src/components',
  'src/pages',
  'src/layouts',
  'src/routes',
  'src/context',
  'src/hooks',
  'src/services',
  'src/utils',
  'src/styles',
];

const files = [
  'src/App.jsx',
  'src/main.jsx',
  'package.json'
];

function createDirectories() {
  directories.forEach((dir) => {
    const fullPath = path.join(__dirname, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
}

function createFiles() {
  files.forEach((file) => {
    const fullPath = path.join(__dirname, file);
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, '');
      console.log(`📄 Created file: ${file}`);
    }
  });
}

function setupLMSClient() {
  console.log('🚀 Setting up LMS client folder structure...');
  createDirectories();
  createFiles();
  console.log('✅ Setup complete!');
}

setupLMSClient();
