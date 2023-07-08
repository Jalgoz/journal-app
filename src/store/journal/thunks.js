import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from './journalSlice';
import { PATH_NOTES } from '../../constants/routeConstants';
import { loadNotes } from '../../helpers';

export const starNewNote = () => {
  // The first arg is the dispatch and the second is a
  // method called getState() all the states in the store
  return async (dispatch, getState) => {
    // I fetch the auth state from the store
    dispatch(savingNewNote())
    const { uid } = getState().auth;
    // uuid
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const path = PATH_NOTES(uid);
    const referenceNewDoc = doc(collection(FirebaseDB, path));
    await setDoc(referenceNewDoc, newNote);

    newNote.id = referenceNewDoc.id;

    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
  };
};

export const startLoadingNotes = () => async(dispatch, getState) => {
  const { uid } = getState().auth;
  if (!uid) throw new Error('UUID not found');

  const notes = await loadNotes(uid);
  dispatch(setNotes(notes));
};

export const startSaveNote = () => async(dispatch, getState) => {
  const { uid } = getState().auth;
  const { active: note } = getState().journal;

  dispatch(setSaving());

  const noteToFireStore = { ...note };
  // We delete the id from the noteToFireStore to update in the DB, because we don't want to create 
  // again the id
  delete noteToFireStore.id;

  // This docRef is only the reference
  const docRef = doc(FirebaseDB, `${PATH_NOTES(uid)}/${note.id}`);

  await setDoc(docRef, noteToFireStore, { merge: true });
  dispatch(updateNote(note));
};
