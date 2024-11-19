import { initializeApp, getApps } from "firebase/app";
import { getStorage, ref, listAll } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5X_cWq-EJNeJg0DtlolPQG122yI58DHo",
  authDomain: "socialhardware-f7a2c.firebaseapp.com",
  projectId: "socialhardware-f7a2c",
  storageBucket: "socialhardware-f7a2c.firebasestorage.app",
  messagingSenderId: "626175850201",
  appId: "1:626175850201:web:456d9cf0f6d444669bb0c8",
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
