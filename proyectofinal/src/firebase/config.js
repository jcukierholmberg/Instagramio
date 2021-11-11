import app from 'firebase/app';
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZpovkOZVGEQSt7nyiogD48KV9keCAEb4",
  authDomain: "unpro3tm03.firebaseapp.com",
  projectId: "unpro3tm03",
  storageBucket: "unpro3tm03.appspot.com",
  messagingSenderId: "1039144005784",
  appId: "1:1039144005784:web:552580a152c0443250a0ed"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCN-dCTMlgH_m3EAX87d4_DoggZeYOW--k",
//   authDomain: "ig-jfk.firebaseapp.com",
//   projectId: "ig-jfk",
//   storageBucket: "ig-jfk.appspot.com",
//   messagingSenderId: "276690169291",
//   appId: "1:276690169291:web:9db83ce7b572dade3bda4e"
// };


app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = app.firestore();