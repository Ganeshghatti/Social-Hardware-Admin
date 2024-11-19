import fs from 'fs/promises';
import path from 'path';

export async function uploadFile(files, title) {
  try {
    if (!title) {
      throw new Error('Title is required for upload');
    }

    // Format title for folder name
    const formattedTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    
    const timestamp = Date.now();
    const folderName = `${formattedTitle}_${timestamp}`;
    const folderPath = path.join(process.cwd(), 'public', 'uploads', folderName);
    
    // Create folder
    await fs.mkdir(folderPath, { recursive: true });

    const imagePaths = {};

    // Process cover image
    if (files.coverImage) {
      const ext = path.extname(files.coverImage.name);
      const coverPath = path.join(folderPath, `cover${ext}`);
      const coverBuffer = Buffer.from(await files.coverImage.arrayBuffer());
      await fs.writeFile(coverPath, coverBuffer);
      imagePaths.coverImage = `/uploads/${folderName}/cover${ext}`;
    }

    // Process thumbnail image
    if (files.thumbnailImage) {
      const ext = path.extname(files.thumbnailImage.name);
      const thumbnailPath = path.join(folderPath, `thumbnail${ext}`);
      const thumbnailBuffer = Buffer.from(await files.thumbnailImage.arrayBuffer());
      await fs.writeFile(thumbnailPath, thumbnailBuffer);
      imagePaths.thumbnailImage = `/uploads/${folderName}/thumbnail${ext}`;
    }

    return imagePaths;
  } catch (error) {
    console.error('Error in uploadFile:', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
}

export async function deleteImages(blog) {
  try {
    if (!blog.coverImage && !blog.thumbnailImage) return;

    // Get folder path from either image path
    const imagePath = blog.coverImage || blog.thumbnailImage;
    const folderPath = path.join(
      process.cwd(),
      'public',
      path.dirname(imagePath.replace(/^\//, ''))
    );

    // Delete the entire folder and its contents
    await fs.rm(folderPath, { recursive: true, force: true });
  } catch (error) {
    console.error('Error deleting images:', error);
    throw new Error('Failed to delete images');
  }
}