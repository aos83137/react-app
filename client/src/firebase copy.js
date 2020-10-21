import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export { firestore };
