import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file name and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source and destination paths
const sourcePath = path.resolve(__dirname, '../../ai_research_database.json');
const publicDir = path.resolve(__dirname, '../public');
const destPath = path.resolve(publicDir, 'ai_research_database.json');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy the file
try {
  const data = fs.readFileSync(sourcePath, 'utf8');
  fs.writeFileSync(destPath, data);
  console.log('Database file successfully copied to public folder');
} catch (error) {
  console.error('Error copying database file:', error);
  process.exit(1);
}
