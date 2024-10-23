import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(collectionNme, data) {
  try {
    const docRef = await addDoc(collection(database, collectionNme), data);
    console.log(docRef);
  } catch (err) {
    console.log("Error adding document: ", err);
  }
}

export async function deleteFromDB(collectionNme, id) {
  try {
    await deleteDoc(doc(database, collectionNme, id));
    console.log(`Document with ID ${id} deleted successfully`);
  } catch (err) {
    console.error("Error deleting document: ", err);
  }
}

export async function deleteAll(collectionNme) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionNme));

    const deletePromises = querySnapshot.docs.map((snapDoc) => {
      return deleteDoc(doc(database, collectionNme, snapDoc.id));
    });
    await Promise.all(deletePromises);
  } catch (err) {
    console.error("Error deleting all documents: ", err);
  }
}

export const updateFromDB = async (collectionNme, id, updateObj) => {
  try {
    await updateDoc(doc(database, collectionNme, id), updateObj);
    console.log("updating successfully", id);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const getAllDocs = async (collectionNme) => {
  try {
    const querySnapshot = await getDocs(collection(database, collectionNme));
    const data = querySnapshot.docs.map((docSnap) => {
      return docSnap.data();
    });
    return data;
  } catch (error) {
    console.error("Error getAllDocs: ", error);
  }
};
