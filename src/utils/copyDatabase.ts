import fs from 'fs';
import path from 'path';

// This function is to be run during build process to copy the database to public folder
export const copyDatabase = () => {
  const sourcePath = path.resolve(__dirname, '../../../ai_research_database.json');
  const destPath = path.resolve(__dirname, '../../../public/ai_research_database.json');
  
  try {
    // Read the file
    const data = fs.readFileSync(sourcePath, 'utf8');
    
    // Write to destination
    fs.writeFileSync(destPath, data);
    
    console.log('Database file successfully copied to public folder');
  } catch (error) {
    console.error('Error copying database file:', error);
  }
};
