// import cloudinary from '../../cloudinary/config';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase';
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setImagesToActiveNote,
  setNotes,
  setSaving,
  updateNote,
} from './journalSlice';
import { PATH_NOTES } from '../../constants/routeConstants';
import { fileUpload, loadNotes } from '../../helpers';
import { simpleErrorAlert, simpleSuccessAlert } from '../../helpers/alerts';

export const startNewNote = () => {
  // The first arg is the dispatch and the second is a
  // method called getState() all the states in the store
  return async (dispatch, getState) => {
    // I fetch the auth state from the store
    dispatch(savingNewNote());
    const { uid } = getState().auth;
    const { notes } = getState().journal;

    // uuid
    const newNote = {
      title: `Autogenerate ${notes.length + 1}`,
      body: '',
      imageUrls: [],
      date: new Date().getTime(),
    };

    const path = PATH_NOTES(uid);
    const referenceNewDoc = doc(collection(FirebaseDB, path));
    await setDoc(referenceNewDoc, newNote);

    newNote.id = referenceNewDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => async (dispatch, getState) => {
  const { uid } = getState().auth;
  if (!uid) throw new Error('UUID not found');

  const notes = await loadNotes(uid);
  dispatch(setNotes(notes));
};

export const startSaveNote = () => async (dispatch, getState) => {
  const { uid } = getState().auth;
  const { active: note } = getState().journal;

  dispatch(setSaving(true));

  const noteToFireStore = { ...note };
  // We delete the id from the noteToFireStore to update in the DB, because we don't want to create
  // again the id
  delete noteToFireStore.id;

  // This docRef is only the reference
  const docRef = doc(FirebaseDB, `${PATH_NOTES(uid)}/${note.id}`);

  try {
    await setDoc(docRef, noteToFireStore, { merge: true });
    simpleSuccessAlert('Note updated', `${note.title} updated successfully!`);
    dispatch(updateNote(note));
  } catch (error) {
    simpleErrorAlert('Error', error);
    dispatch(setSaving(false));
  }
};

export const startUploadingFiles =
  (files = []) =>
  async (dispatch, getState) => {
    dispatch(setSaving(true));
    const fileUploadPromises = [];
    const { uid } = getState().auth;
    const { active: activeNote, notes } = getState().journal;
    // Important use for of due the promises in fileUpload
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    try {
      const imageUrls = await Promise.all(fileUploadPromises);
      const noteToUpdate = {
        id: activeNote.id,
        imageUrls: [...imageUrls, ...activeNote.imageUrls],
      };
      const notesUpdated = notes.map((note) =>
        note.id === activeNote.id
          ? {
              ...activeNote,
              imageUrls: [...imageUrls, ...activeNote.imageUrls],
            }
          : note,
      );

      await simpleSaveNote(uid, noteToUpdate);
      await dispatch(setImagesToActiveNote(imageUrls));
      await dispatch(setNotes(notesUpdated));
    } catch (error) {
      simpleErrorAlert('Error', error);
      dispatch(setSaving(false));
    }
  };

export const startDeletingNote = () => async (dispatch, getState) => {
  const { uid } = getState().auth;
  const { active: activeNote } = getState().journal;

  const docRef = doc(FirebaseDB, `${PATH_NOTES(uid)}/${activeNote.id}`);
  dispatch(setSaving(true));

  try {
    await deleteDoc(docRef);
    dispatch(deleteNoteById(activeNote.id));
    simpleSuccessAlert('Deleted!', 'Your note has been deleted');
  } catch (error) {
    simpleErrorAlert('Error', error);
    dispatch(setSaving(false));
  }
};

export const startDeletingImage = (url) => async(dispatch, getState) => {
  const segments = url.split('/');
  const publicId = segments[segments.length - 1].split('.')[0];

  // await cloudinary.api.delete_resources(['journal/' + publicId]);
};

const simpleSaveNote = async (userId, note) => {
  const docRef = doc(FirebaseDB, `${PATH_NOTES(userId)}/${note.id}`);
  delete note.id;

  try {
    await setDoc(docRef, note, { merge: true });
  } catch (error) {
    simpleErrorAlert('Error', error);
  }
};
