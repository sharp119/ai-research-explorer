import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file name and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try multiple possible locations for the source file
const possibleSourcePaths = [
  path.resolve(__dirname, '../../ai_research_database.json'),
  path.resolve(__dirname, '../ai_research_database.json'),
  '/vercel/path0/ai_research_database.json',
  path.join(process.cwd(), 'ai_research_database.json')
];

const publicDir = path.resolve(__dirname, '../public');
const destPath = path.resolve(publicDir, 'ai_research_database.json');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Check if the destination file already exists
if (fs.existsSync(destPath)) {
  console.log('Database file already exists in public folder, skipping copy');
  process.exit(0);
}

// Try to find and copy the database file from any of the possible locations
let copied = false;

for (const sourcePath of possibleSourcePaths) {
  try {
    if (fs.existsSync(sourcePath)) {
      const data = fs.readFileSync(sourcePath, 'utf8');
      fs.writeFileSync(destPath, data);
      console.log(`Database file successfully copied from ${sourcePath} to public folder`);
      copied = true;
      break;
    }
  } catch (error) {
    console.log(`Failed to copy from ${sourcePath}: ${error.message}`);
  }
}

if (!copied) {
  console.log('Could not find database file in any location. Creating an empty database file.');
  try {
    // Create an empty database file to prevent build failure
    fs.writeFileSync(destPath, JSON.stringify({ papers: [] }));
    console.log('Created empty database file');
  } catch (error) {
    console.error('Error creating empty database file:', error);
    process.exit(1);
  }
}
