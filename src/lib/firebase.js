import { initializeApp, getApps } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5X_cWq-EJNeJg0DtlolPQG122yI58DHo",
  authDomain: "socialhardware-f7a2c.firebaseapp.com",
  projectId: "socialhardware-f7a2c",
  storageBucket: "socialhardware-f7a2c.firebasestorage.app",
  messagingSenderId: "626175850201",
  appId: "1:626175850201:web:456d9cf0f6d444669bb0c8",
};

let app;
let storage;

try {
  if (!getApps().length) {
    console.log("Initializing Firebase app...");
    app = initializeApp(firebaseConfig);
  } else {
    console.log("Firebase app already initialized");
    app = getApps()[0];
  }

  storage = getStorage(app);

  // Test storage access
  console.log("Testing storage connection...");
  console.log("Storage bucket:", storage.bucket);

  // Test with a small upload
  const testRef = ref(storage, "test/connection-test.txt");
  const testData = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // "Hello"

  uploadBytes(testRef, testData)
    .then(() => {
      console.log("✅ Storage connection successful");
    })
    .catch((error) => {
      console.error("❌ Storage connection failed:", {
        code: error.code,
        message: error.message,
        serverResponse: error.customData?.serverResponse,
        bucket: storage.bucket,
        config: {
          ...firebaseConfig,
          apiKey: "***",
        },
      });
    });
} catch (error) {
  console.error("Firebase initialization error:", error);
  throw error;
}

export { storage };
