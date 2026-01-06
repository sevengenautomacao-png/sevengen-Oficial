// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-8311475768-65da5",
  "appId": "1:87121367120:web:cb3572a24e532423a8c155",
  "apiKey": "AIzaSyCNXd4bQcKkxLzzgUwPnMKoaLe5KpZ02r0",
  "authDomain": "studio-8311475768-65da5.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "87121367120"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
