import { collection, addDoc, doc, deleteDoc, getDocs } from "firebase/firestore";
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
