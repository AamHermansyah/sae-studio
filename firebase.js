import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDlHfo1_l2gXUu7mrKTWPVEOJGrfaHlPQk",
  authDomain: "my-portfolio-46ab5.firebaseapp.com",
  projectId: "my-portfolio-46ab5",
  storageBucket: "my-portfolio-46ab5.appspot.com",
  messagingSenderId: "1025148192648",
  appId: "1:1025148192648:web:6b7766a783511c29f5dc3d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);