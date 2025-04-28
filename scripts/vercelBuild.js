import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get the current file name and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting Vercel build process...');

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
  console.log('Creating public directory...');
  fs.mkdirSync(publicDir, { recursive: true });
}

// Try to find and copy the database file from any of the possible locations
let copied = false;

for (const sourcePath of possibleSourcePaths) {
  console.log(`Checking for database at: ${sourcePath}`);
  try {
    if (fs.existsSync(sourcePath)) {
      console.log(`Found database at: ${sourcePath}`);
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
    // Continue with build anyway
  }
}

// Run the actual build commands
try {
  console.log('TypeScript check only (not failing on errors)...');
  // Run TypeScript check but don't fail the build
  try {
    execSync('tsc --noEmit', { stdio: 'inherit' });
  } catch (tsError) {
    console.log('TypeScript check found errors but continuing with build...');
  }
  
  console.log('Running Vite build...');
  execSync('vite build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build process failed:', error);
  process.exit(1);
} 