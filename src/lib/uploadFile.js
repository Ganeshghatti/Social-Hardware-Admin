import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export async function uploadFile(files, title) {
  try {
    console.log('Starting upload process');
    console.log('Files received:', files);
    
    const formattedTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    
    const timestamp = Date.now();
    const folderName = `${formattedTitle}_${timestamp}`;
    const imagePaths = {};

    // Upload cover image if provided
    if (files.coverImage) {
      const coverExt = files.coverImage.name.split('.').pop();
      const coverPath = `blogs/${folderName}/cover.${coverExt}`;
      const coverRef = ref(storage, coverPath);
      const coverBuffer = await files.coverImage.arrayBuffer();
      await uploadBytes(coverRef, coverBuffer, {
        contentType: files.coverImage.type
      });
      imagePaths.coverImage = await getDownloadURL(coverRef);
      console.log('Cover image uploaded:', imagePaths.coverImage);
    }

    // Upload thumbnail image if provided
    if (files.thumbnailImage) {
      const thumbnailExt = files.thumbnailImage.name.split('.').pop();
      const thumbnailPath = `blogs/${folderName}/thumbnail.${thumbnailExt}`;
      const thumbnailRef = ref(storage, thumbnailPath);
      const thumbnailBuffer = await files.thumbnailImage.arrayBuffer();
      await uploadBytes(thumbnailRef, thumbnailBuffer, {
        contentType: files.thumbnailImage.type
      });
      imagePaths.thumbnailImage = await getDownloadURL(thumbnailRef);
      console.log('Thumbnail image uploaded:', imagePaths.thumbnailImage);
    }

    return imagePaths;
  } catch (error) {
    console.error('Error in uploadFile:', error);
    throw error;
  }
}

export async function deleteImages(images) {
  try {
    const deletePromises = [];

    if (images.coverImage) {
      try {
        const coverRef = ref(storage, getPathFromUrl(images.coverImage));
        deletePromises.push(deleteObject(coverRef));
      } catch (error) {
        console.error('Error deleting cover image:', error);
      }
    }

    if (images.thumbnailImage) {
      try {
        const thumbnailRef = ref(storage, getPathFromUrl(images.thumbnailImage));
        deletePromises.push(deleteObject(thumbnailRef));
      } catch (error) {
        console.error('Error deleting thumbnail image:', error);
      }
    }

    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting images:', error);
    throw new Error('Failed to delete images');
  }
}

function getPathFromUrl(url) {
  try {
    const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/`;
    const path = url.replace(baseUrl, '');
    return decodeURIComponent(path.split('?')[0]);
  } catch (error) {
    console.error('Error extracting path:', error);
    return null;
  }
}