import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjPtAD3TEFlr1-GS6Yjq9EnNvwR4peE0E",
  authDomain: "tarefas-40bb5.firebaseapp.com",
  projectId: "tarefas-40bb5",
  storageBucket: "tarefas-40bb5.appspot.com",
  messagingSenderId: "205489309678",
  appId: "1:205489309678:web:6f73e4dff56f7f278270ff",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
export { db };
