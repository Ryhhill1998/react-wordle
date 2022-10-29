import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  writeBatch,
  doc,
  getDocs,
  addDoc,
  query,
  where,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoRo5Oo5dIlZOU_oGEaOxMJSZdKBao6FY",
  authDomain: "wordle-db-1f602.firebaseapp.com",
  projectId: "wordle-db-1f602",
  storageBucket: "wordle-db-1f602.appspot.com",
  messagingSenderId: "1009621719124",
  appId: "1:1009621719124:web:51170797141d4042d4f5c1",
};

// initialise app
const app = initializeApp(firebaseConfig);

// --------------- AUTHENTICATION --------------- //

// get auth
export const auth = getAuth(app);

// update user profile
export const updateUserProfile = async (user, displayName) => {
  if (!user) return;

  await updateProfile(user, { displayName: "Jeff" });
};

// sign up new user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential?.user;
    updateUserProfile(user);
  } catch (error) {
    console.error(error.message);
  }
};

// sign out the currently authenticated user
export const signOutAuthUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error(error.message);
  }
};

// sign in and authenticate user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential?.user;
};

// --------------- DATABASE MAINTENANCE --------------- //

// initialise database
const db = getFirestore(app);

// function used to add all words to db via a transaction
export const addCollectionAndDocuments = async (dataArray) => {
  const colRef = collection(db, "allWords");
  const batch = writeBatch(db);

  dataArray.forEach((object) => {
    const docRef = doc(colRef);
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("Batches committed");
};

// get all words from allWords collection in database
export const getChosenWord = async (index) => {
  const colRef = collection(db, "allWords");

  const q = query(colRef, where("index", "==", index));

  const querySnapshot = await getDocs(q);

  const chosenWord = [];

  querySnapshot.forEach((doc) => {
    chosenWord.push(doc.data().word);
  });

  return chosenWord[0];
};

// set daily word
const setDailyWord = async (date) => {
  const randomIndex = Math.floor(Math.random() * 3624);

  const chosenWord = await getChosenWord(randomIndex);

  const colRef = collection(db, "dailyWords");

  const docRef = await addDoc(colRef, {
    word: chosenWord,
    dateCreated: date,
  });

  console.log("Document written with ID: ", docRef.id);

  return chosenWord;
};

// get daily word
export const getDailyWord = async (date) => {
  const colRef = collection(db, "dailyWords");

  const q = query(colRef, where("dateCreated", "==", date));

  const querySnapshot = await getDocs(q);

  const dailyWord = [];

  querySnapshot.forEach((doc) => {
    dailyWord.push(doc.data().word);
  });

  if (!dailyWord.length) {
    const word = await setDailyWord(date);
    dailyWord.push(word);
  }

  return dailyWord[0];
};
