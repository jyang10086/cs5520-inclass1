import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { auth, database } from "./firebaseSetup";

export const getUserLocation = async () => {
  try {
    const userDocRef = doc(database, "users", auth.currentUser.uid); // Adjust the collection name if needed
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.warn(`No user found with ID: ${userId}`);
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveUserLocation = async (location) => {
  try {
    const userId = auth.currentUser.uid; // Ensure the user is authenticated
    const userDocRef = doc(database, "users", userId); // Reference to the user's document in the "users" collection

    // Save location with merge option to avoid overwriting existing data
    await setDoc(userDocRef, { location }, { merge: true });

    console.log("User location saved successfully!");
  } catch (error) {
    console.error("Error saving user location:", error);
    throw error;
  }
};

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
