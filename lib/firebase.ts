import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  // @ts-ignore
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStore from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtiOToDFoFuQnVN5_hiGueJoK2KEg5wpE",
  authDomain: "yango-910f1.firebaseapp.com",
  projectId: "yango-910f1",
  storageBucket: "yango-910f1.firebasestorage.app",
  messagingSenderId: "454792083788",
  appId: "1:454792083788:web:156260973f05458008b7e9"
};


const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(
  app,
  { persistence: getReactNativePersistence(AsyncStore)}
);