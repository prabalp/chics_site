// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfLkxEHUVI6D-DjimtBtNBPw9weNbmON0",
  authDomain: "chics-app.firebaseapp.com",
  projectId: "chics-app",
  storageBucket: "chics-app.appspot.com",
  messagingSenderId: "1035037297892",
  appId: "1:1035037297892:web:f5d77124b959ffb00eb0f1",
  measurementId: "G-CSQJ47L1H1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
