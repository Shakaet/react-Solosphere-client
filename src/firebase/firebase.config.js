// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)





// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDSOngnjQMBdepCs4Ua0QL_rF1lstGI3zA",
//   authDomain: "conceptptact.firebaseapp.com",
//   projectId: "conceptptact",
//   storageBucket: "conceptptact.firebasestorage.app",
//   messagingSenderId: "650950168646",
//   appId: "1:650950168646:web:792bdf97d7b927fa4e7a47"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
