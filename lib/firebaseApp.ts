import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCXNtHe849Ypk8_-8_na8cZ_LN0cAZwiGQ",
    authDomain: "bonnmarse-5fe6c.firebaseapp.com",
    projectId: "bonnmarse-5fe6c",
    storageBucket: "bonnmarse-5fe6c.firebasestorage.app",
    messagingSenderId: "804896940653",
    appId: "1:804896940653:web:e310f9b97c836e575d9564",
    measurementId: "G-KXVPSZ3KL0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
