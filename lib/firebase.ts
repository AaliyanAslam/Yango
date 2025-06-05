// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  // @ts-ignore
  getReactNativePersistence,
} from "firebase/auth";
 // @ts-ignore
import AsyncStore from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu54LAuc-KcB1HWnbWQoGlClA9BfXq7nM",
  authDomain: "yango-1daa7.firebaseapp.com",
  projectId: "yango-1daa7",
  storageBucket: "yango-1daa7.firebasestorage.app",
  messagingSenderId: "663820459211",
  appId: "1:663820459211:web:c0bd9b049ad86ce9c18f4e",
  measurementId: "G-YG8WC4C9PM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(
  app,
  { persistence: getReactNativePersistence(AsyncStore)}
);