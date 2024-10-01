import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCZ7DkMbzxGbF8fvdIYh4zfdHTGPR50BAY",
  authDomain: "school-template-a16a8.firebaseapp.com",
  projectId: "school-template-a16a8",
  storageBucket: "school-template-a16a8.appspot.com",
  messagingSenderId: "796803618559",
  appId: "1:796803618559:web:ab6a9b7bbd30f31e56deca",
  measurementId: "G-RVS8VFM72Y"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);


export { db, auth, storage };