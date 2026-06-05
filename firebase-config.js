// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDkAX4UdiuUyfR3c5_E7qPG6xpCtWr3FYw",
  authDomain: "togbeyedy-49129.firebaseapp.com",
  projectId: "togbeyedy-49129",
  storageBucket: "togbeyedy-49129.firebasestorage.app",
  messagingSenderId: "895068990371",
  appId: "1:895068990371:web:d9c918d6b588a6b4338816"
};

const app = initializeApp(firebaseConfig);
export { app };
