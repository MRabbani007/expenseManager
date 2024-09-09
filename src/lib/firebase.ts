// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxyE6j0ZJyXerMKkpun51Ad4hphhyU2tw",
  authDomain: "expensemanager-c0b0c.firebaseapp.com",
  projectId: "expensemanager-c0b0c",
  storageBucket: "expensemanager-c0b0c.appspot.com",
  messagingSenderId: "71600996225",
  appId: "1:71600996225:web:9b5efea9363307d2f9f280",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const storage = getStorage(firebase);
