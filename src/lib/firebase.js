import { initializeApp, getApps } from "firebase/app";
import { getStorage, ref, listAll } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app;
try {
  if (!getApps().length) {
    console.log("No Firebase apps found, initializing new app");
    app = initializeApp(firebaseConfig);
  } else {
    console.log("Firebase app already exists, reusing");
    app = getApps()[0];
  }
} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw error;
}

const storage = getStorage(app);

// Test storage access
console.log("Testing storage bucket access...");
const testRef = ref(storage, "/");
listAll(testRef)
  .then(() => {
    console.log("✅ Storage bucket is accessible");
  })
  .catch((error) => {
    console.error("❌ Storage bucket access error:", {
      code: error.code,
      message: error.message,
      serverResponse: error.customData?.serverResponse,
    });
  });

export { storage };
