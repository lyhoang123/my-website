import { initializeApp } from 'firebase/app'; 
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyAV9Ne7e_-wU7Pvr4flx9KCQzcV0CRUwlg",
  authDomain: "clone-foundation.firebaseapp.com",
  projectId: "clone-foundation",
  storageBucket: "clone-foundation.appspot.com",
  messagingSenderId: "32225041996",
  appId: "1:32225041996:web:1d8fdc09d980b7dccb1ee9",
  measurementId: "G-NYW8J9JGKY",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const data: any = await signInWithEmailAndPassword(auth, email, password);

    //save data to local storage
    localStorage.setItem("access_token", data.user.accessToken);
  } catch (err: any) {
    console.error(err);
    alert(err.message);
    return false;
  }
  return true;
};

const registerWithEmailAndPassword = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  retypePassword: string,
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const data: any = await addDoc(collection(db, "users"), {
      uid: user.uid,
      firstName,
      lastName,
      authProvider: "local",
      email,
    });
    localStorage.setItem("access_token", data.user.accessToken);
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

export {
  auth,
  db,
  firebaseConfig,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
};
