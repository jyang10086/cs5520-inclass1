import { collection, addDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(collectionNme, data) {
  try {
    const docRef = await addDoc(collection(database, collectionNme), data);
    console.log(docRef);
  } catch (err) {
    console.log(err);
  }
}
