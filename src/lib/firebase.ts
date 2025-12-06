// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Ensure we don't reinitialize
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const storage = getStorage(app);

export const uploadImagesToFirebase = async (files: File[]) => {
  if (!files.length) return [];

  const uploadedFiles = await Promise.all(
    files.map(async (file) => {
      const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
      const fileRef = ref(storage, `uploads/${uniqueName}`);
      await uploadBytes(fileRef, file);
      return getDownloadURL(fileRef);
    })
  );

  return uploadedFiles;
};
