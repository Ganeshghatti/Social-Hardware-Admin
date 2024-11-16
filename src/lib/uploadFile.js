import path from 'path';
import fs from 'fs/promises';

export async function uploadFile(file, title = '') {
  try {
    console.log('Received title:', title);

    // Format the title for the filename
    const formattedTitle = title
      ? title.toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '_')
          .replace(/_+/g, '_')
          .replace(/^_|_$/g, '')
          .slice(0, 100) // Limit length
      : 'image';

    console.log('Formatted title:', formattedTitle);

    // Generate random 5 digit number
    const randomNum = Math.floor(10000 + Math.random() * 90000);

    // Create unique filename
    const fileExtension = path.extname(file.name).toLowerCase();
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    
    if (!validExtensions.includes(fileExtension)) {
      throw new Error('Invalid file type. Only images are allowed');
    }

    const filename = `${formattedTitle}_${randomNum}${fileExtension}`;
    console.log('Final filename:', filename);

    // Ensure uploads directory exists
    const publicPath = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.access(publicPath);
    } catch {
      await fs.mkdir(publicPath, { recursive: true });
    }

    // Write file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(publicPath, filename);
    
    await fs.writeFile(filePath, buffer);
    return `/uploads/${filename}`;
  } catch (error) {
    console.error('Error in uploadFile:', error);
    throw new Error('Failed to upload file: ' + error.message);
  }
}
