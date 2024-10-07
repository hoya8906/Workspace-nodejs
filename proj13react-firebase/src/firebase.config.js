import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCU1Pf0ywGsCxXvzeSV5mvOfnuVw0BF72A",
    authDomain: "hoya-01-6b5ad.firebaseapp.com",
    projectId: "hoya-01-6b5ad",
    storageBucket: "hoya-01-6b5ad.appspot.com",
    messagingSenderId: "241381083689",
    appId: "1:241381083689:web:244de5feaaec1619b62a38"
};

firebase.initializeApp(firebaseConfig);

export const dbService = firebase.firestore();
// export const authService = firebase.auth();
// export const storageService = firebase.storage();