import firebase from 'firebase/compat';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDouFkYnbOWrIQetaan-JCpJmgZ6VxNINg",
  authDomain: "crwn-db-46180.firebaseapp.com",
  projectId: "crwn-db-46180",
  storageBucket: "crwn-db-46180.appspot.com",
  messagingSenderId: "780387818154",
  appId: "1:780387818154:web:ada9dca79e888d83920ed3"
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
    } catch (error){
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

