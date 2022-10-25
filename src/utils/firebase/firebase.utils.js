import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  writeBatch,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

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

// initialise database
const db = getFirestore(app);

// function used to add all words to db via a transaction
export const addCollectionAndDocuments = async (colKey, dataArray) => {
  const colRef = collection(db, colKey);
  const batch = writeBatch(db);

  dataArray.forEach((object) => {
    const docRef = doc(colRef);
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("Batches committed");
};

// get all words from allWords collection in database
export const getChosenWord = async (colKey, index) => {
  const colRef = collection(db, colKey);

  // Create a query against the collection.
  const q = query(colRef, where("index", "==", index));

  const querySnapshot = await getDocs(q);

  const chosenWord = [];

  querySnapshot.forEach((doc) => {
    chosenWord.push(doc.data().word);
  });

  return chosenWord[0];
};
