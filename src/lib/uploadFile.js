import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export async function uploadFile(files, title) {
  try {
    console.log('Starting upload process');
    console.log('Files received:', files);
    
    if (!storage) {
      throw new Error('Firebase Storage not initialized');
    }

    const formattedTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    
    const timestamp = Date.now();
    const folderName = `blogs/${formattedTitle}_${timestamp}`;
    const imagePaths = {};

    // Upload cover image if provided
    if (files.coverImage) {
      try {
        console.log('Uploading cover image...');
        const coverExt = files.coverImage.name.split('.').pop();
        const coverPath = `${folderName}/cover.${coverExt}`;
        const coverRef = ref(storage, coverPath);
        
        console.log('Cover path:', coverPath);
        const coverBuffer = await files.coverImage.arrayBuffer();
        
        const coverSnapshot = await uploadBytes(coverRef, coverBuffer, {
          contentType: files.coverImage.type,
          customMetadata: {
            originalName: files.coverImage.name
          }
        });
        
        imagePaths.coverImage = await getDownloadURL(coverSnapshot.ref);
        console.log('Cover image uploaded successfully:', imagePaths.coverImage);
      } catch (error) {
        console.error('Error uploading cover image:', {
          code: error.code,
          message: error.message,
          serverResponse: error.customData?.serverResponse
        });
        throw error;
      }
    }

    // Upload thumbnail image if provided
    if (files.thumbnailImage) {
      try {
        console.log('Uploading thumbnail image...');
        const thumbnailExt = files.thumbnailImage.name.split('.').pop();
        const thumbnailPath = `${folderName}/thumbnail.${thumbnailExt}`;
        const thumbnailRef = ref(storage, thumbnailPath);
        
        console.log('Thumbnail path:', thumbnailPath);
        const thumbnailBuffer = await files.thumbnailImage.arrayBuffer();
        
        const thumbnailSnapshot = await uploadBytes(thumbnailRef, thumbnailBuffer, {
          contentType: files.thumbnailImage.type,
          customMetadata: {
            originalName: files.thumbnailImage.name
          }
        });
        
        imagePaths.thumbnailImage = await getDownloadURL(thumbnailSnapshot.ref);
        console.log('Thumbnail image uploaded successfully:', imagePaths.thumbnailImage);
      } catch (error) {
        console.error('Error uploading thumbnail image:', {
          code: error.code,
          message: error.message,
          serverResponse: error.customData?.serverResponse
        });
        throw error;
      }
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