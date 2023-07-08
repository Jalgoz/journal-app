import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSaving: false,
  messageSaved: '',
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
    setSaving: (state) => {
      state.isSaving = true;
    },
    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) =>
        (note.id === action.payload.id) ? action.payload : note,
      );
    },
    deleteNoteById: (state, action) => {
      /* state.isSaving = false;
      state.notes = state.notes.filter((note) => ) */
    },
  },
});

export const {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
} = journalSlice.actions;
export default journalSlice.reducer;
