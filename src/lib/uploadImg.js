import { storage } from "./firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export async function uploadImg(file, slug) {
  try {
    console.log("Starting upload process");
    console.log("File received:", file);

    if (!storage) {
      throw new Error("Firebase Storage not initialized");
    }

    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const fileName = `${file.name.split('.').slice(0, -1).join('.')}_${timestamp}.${fileExt}`;
    const filePath = `blogs/${slug}/${fileName}`;

    const fileRef = ref(storage, filePath);
    const fileBuffer = await file.arrayBuffer();

    const uploadSnapshot = await uploadBytes(fileRef, fileBuffer, {
      contentType: file.type,
      customMetadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString()
      },
    });

    const downloadUrl = await getDownloadURL(uploadSnapshot.ref);
    console.log('File uploaded successfully:', downloadUrl);
    
    return downloadUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
