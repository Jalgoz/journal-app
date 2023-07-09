import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSaving: false,
  notes: [],
  active: null,
  /* active: {
    id: 'ABC123',
    title: '',
    body: '',
    date: 123456,
    imageUrls: [], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
  } */
};

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  // All within the reducer have to be sync not async because it's a pure function
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state, action) => {
      state.isSaving = action.payload;
    },
    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) =>
        (note.id === action.payload.id) ? action.payload : note,
      );
    },
    setImagesToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      console.log(state.active);
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.active = null;
    },
  },
});

export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setImagesToActiveNote,
  setNotes,
  setSaving,
  updateNote,
} = journalSlice.actions;
export default journalSlice.reducer;
