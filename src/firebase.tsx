import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKirdwP6_ysN7mBUa3LmT7xd2FNJerh7Y",
  authDomain: "authentication-f2e7f.firebaseapp.com",
  projectId: "authentication-f2e7f",
  storageBucket: "authentication-f2e7f.appspot.com",
  messagingSenderId: "33835745088",
  appId: "1:33835745088:web:12868d2650a8d2dedf84a5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
