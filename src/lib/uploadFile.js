import fs from 'fs/promises';
import path from 'path';

export async function uploadFile(file, title) {
  try {
    // Format title for folder name (remove special chars, replace spaces with hyphens)
    const formattedTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    // Create base uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    // Create blog-specific directory
    const blogDir = path.join(uploadsDir, formattedTitle);
    await fs.mkdir(blogDir, { recursive: true });

    // Get file extension and create unique filename
    const ext = path.extname(file.name);
    const filename = `${Date.now()}${ext}`;
    
    // Create full file path
    const filepath = path.join(blogDir, filename);
    
    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(filepath, buffer);

    // Return the public URL path
    return `/uploads/${formattedTitle}/${filename}`;
  } catch (error) {
    console.error('Error in uploadFile:', error);
    throw new Error('Failed to upload file');
  }
}
