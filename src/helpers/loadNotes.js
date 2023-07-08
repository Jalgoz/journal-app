import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase";
import { PATH_NOTES } from "../constants/routeConstants";

export const loadNotes = async(uid) => {
  if (!uid) throw new Error('UUID not found');

  // Important if we use collection the path have to call a collection not a document
  const collectionRef = collection(FirebaseDB, PATH_NOTES(uid));
  // With this collection reference now we can fetch all the documents
  const docs = await getDocs(collectionRef);

  const notes = [];
  docs.forEach((doc) => {
    // We have to call doc.data() because doc is only a reference and to get all its data
    // we call the data() method
    notes.push({ id: doc.id, ...doc.data() })
  });
  
  return notes;
};