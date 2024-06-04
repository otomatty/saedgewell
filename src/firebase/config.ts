import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsERW4MRbtcGQjeqA7AKv_yu4LZ8Pivmg",
  authDomain: "saedgewell-app.firebaseapp.com",
  projectId: "saedgewell-app",
  storageBucket: "saedgewell-app.appspot.com",
  messagingSenderId: "798955774777",
  appId: "1:798955774777:web:1c9ed1b5d8c17ff96dbee8",
  measurementId: "G-QSPCLCDQKN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
