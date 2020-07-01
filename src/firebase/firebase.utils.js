import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDAvgaDw6r7RthCp6_K2UcOFLoTPQQjCeo",
    authDomain: "crwn-db-fb560.firebaseapp.com",
    databaseURL: "https://crwn-db-fb560.firebaseio.com",
    projectId: "crwn-db-fb560",
    storageBucket: "crwn-db-fb560.appspot.com",
    messagingSenderId: "1012328374301",
    appId: "1:1012328374301:web:535c794c5a569d65c8a6f4",
    measurementId: "G-MN9F6W97QE"
};


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;

};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

