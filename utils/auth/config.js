import firebase from "firebase/app";
import "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyAtgkFJE2TCrI97ONYzruPuBE1HiRypMpM",
  authDomain: "productivity-ashutosh.firebaseapp.com",
  databaseURL: "https://productivity-ashutosh-default-rtdb.firebaseio.com",
  projectId: "productivity-ashutosh",
  storageBucket: "productivity-ashutosh.appspot.com",
  messagingSenderId: "198097983182",
  appId: "1:198097983182:web:fa0b5b13a990fb9ee9e29f",
  measurementId: "G-RXZDM1RHR0"
};

let app = null;
if (!firebase.apps.length) {
  app = firebase.initializeApp({ ...firebaseConfig });
} else {
  app = firebase.app();
}

export const auth = app.auth();
export default app;
