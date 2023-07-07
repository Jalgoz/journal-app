import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSaving: true,
  messageSaved: '',
  notes: [],
  active: null
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
    addNewEmptyNote: ( state, action ) => {
      state.value += 1;
    },
  },
});

export const { template } = journalSlice.actions;
export default journalSlice.reducer;