import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAeAahX5oii5l654PeIOCA_DyEhCcaEVZw",
  authDomain: "task-plus-8e54d.firebaseapp.com",
  projectId: "task-plus-8e54d",
  storageBucket: "task-plus-8e54d.firebasestorage.app",
  messagingSenderId: "379086949068",
  appId: "1:379086949068:web:afcefd33362b690480d069",
  measurementId: "G-PLFP6MZ68C",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
export { db };
