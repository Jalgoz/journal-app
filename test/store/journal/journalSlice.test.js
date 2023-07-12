import {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  journalSlice,
  savingNewNote,
  setActiveNote,
  setImagesToActiveNote,
  setNotes,
  setSaving,
  updateNote,
} from '../../../src/store/journal/journalSlice';
import {
  initialState,
  notes,
  stateWithNotes,
} from '../../fixtures/journalFixtures';

describe('Testing in journalSlice', () => {
  it('should return the initial state and called "journal"', () => {
    const state = journalSlice.reducer(initialState, {});

    expect(journalSlice.name).toBe('journal');
    expect(state).toEqual(initialState);
  });

  it('should change the isSaving to true when we call savingNewNote', () => {
    const state = journalSlice.reducer(initialState, savingNewNote());

    expect(state.isSaving).toBeTruthy();
  });

  it('should add a new note when we call addNewEmptyNote', () => {
    const state = journalSlice.reducer(initialState, addNewEmptyNote(notes[0]));

    expect(state).toEqual({ ...initialState, notes: [notes[0]] });

    const state2 = journalSlice.reducer(state, addNewEmptyNote(notes[1]));

    expect(state2).toEqual({ ...initialState, notes: [...notes] });
  });

  it('should set a active note when we call setActiveNote', () => {
    const state = journalSlice.reducer(initialState, setActiveNote(notes[0]));

    expect(state.active).toEqual(notes[0]);
  });

  it('should set the notes when we call setNotes', () => {
    const state = journalSlice.reducer(initialState, setNotes(notes));

    expect(state.notes).toEqual(notes);
  });

  it('should change isSaving updateNote when we call setSaving', () => {
    let state = journalSlice.reducer(initialState, setSaving(true));

    expect(state.isSaving).toBeTruthy();

    state = journalSlice.reducer(state, setSaving(false));

    expect(state.isSaving).toBeFalsy();
  });

  it('should update the notes when we call updateNote', () => {
    const noteToUpdate = { ...notes[1], title: 'Title updated' };
    const state = journalSlice.reducer(
      stateWithNotes,
      updateNote(noteToUpdate),
    );

    expect(state.notes).toEqual([notes[0], noteToUpdate]);
  });

  it('should add new imageUrls to the active note when we call setImagesToActiveNote', 
  () => {
    const newImageUrl = ['https://foto3.jpg'];
    const state = journalSlice.reducer(
      stateWithNotes,
      setImagesToActiveNote(newImageUrl),
    );
    const actualLength = state.active.imageUrls.length;

    expect(actualLength).toBe(stateWithNotes.active.imageUrls.length + 1);
    expect(state.active.imageUrls).toContain(newImageUrl[0]);
  });

  it('should clear all the notes and active when we call clearNotesLogout', 
  () => {
    const state = journalSlice.reducer(stateWithNotes, clearNotesLogout());

    expect(state).toEqual(initialState);
  });

  it('should delete by id when we call deleteNoteById', () => {
    const id = stateWithNotes.notes[0].id;
    const state = journalSlice.reducer(stateWithNotes, deleteNoteById(id));

    expect(state.notes.length).toEqual(stateWithNotes.notes.length - 1);
    expect(state.notes).not.toContain(stateWithNotes.notes[0]);
  });
});
