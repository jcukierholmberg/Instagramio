import app from 'firebase/app';
import firebase from 'firebase';

// Your web app's Firebase configuration


const firebaseConfig = {
   apiKey: "AIzaSyCN-dCTMlgH_m3EAX87d4_DoggZeYOW--k",
   authDomain: "ig-jfk.firebaseapp.com",
   projectId: "ig-jfk",
   storageBucket: "ig-jfk.appspot.com",
   messagingSenderId: "276690169291",
   appId: "1:276690169291:web:9db83ce7b572dade3bda4e"
};


app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = app.firestore();