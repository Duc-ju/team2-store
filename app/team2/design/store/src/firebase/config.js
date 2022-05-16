import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCwg_670Ezoif8ytiWaKXxzUkCUmCq0bPk',
    authDomain: 'store-6aa3f.firebaseapp.com',
    projectId: 'store-6aa3f',
    storageBucket: 'store-6aa3f.appspot.com',
    messagingSenderId: '461113654169',
    appId: '1:461113654169:web:2b2743288b44e74d2bb108',
    measurementId: 'G-W9CKNFERB8'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// // Use emulators
// if (window.location.hostname === 'localhost') {
//     auth.useEmulator('http://localhost:9099');
//     db.useEmulator('localhost', '8080');
// }

export { db, auth };
export default firebase;
