import app from 'firebase/app';
import firebase from 'firebase';

// Your web app's Firebase configuration
<<<<<<< HEAD
const firebaseConfig = {
  apiKey: "AIzaSyCN-dCTMlgH_m3EAX87d4_DoggZeYOW--k",
  authDomain: "ig-jfk.firebaseapp.com",
  projectId: "ig-jfk",
  storageBucket: "ig-jfk.appspot.com",
  messagingSenderId: "276690169291",
  appId: "1:276690169291:web:9db83ce7b572dade3bda4e"
};

=======


const firebaseConfig = {
   apiKey: "AIzaSyCN-dCTMlgH_m3EAX87d4_DoggZeYOW--k",
   authDomain: "ig-jfk.firebaseapp.com",
   projectId: "ig-jfk",
   storageBucket: "ig-jfk.appspot.com",
   messagingSenderId: "276690169291",
   appId: "1:276690169291:web:9db83ce7b572dade3bda4e"
};

>>>>>>> b355c6290a88acea016da8460be8f20f84d5f473

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = app.firestore();