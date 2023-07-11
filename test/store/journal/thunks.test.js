import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
} from '../../../src/store/journal/journalSlice';
import { startNewNote } from '../../../src/store/journal/thunks';
import { notes } from '../../fixtures/journalFixtures';
import { FirebaseDB } from '../../../src/firebase';
import { PATH_NOTES } from '../../../src/constants/routeConstants';

describe('Testing in journal thunks', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it('should create a new note in blank when we call startNewNote', async () => {
    const uid = 'TEST_UID';
    const note = {
      title: `Autogenerate ${notes.length + 1}`,
      body: '',
      imageUrls: [],
      id: expect.any(String),
      date: expect.any(Number),
    };

    getState.mockReturnValue({ auth: { uid }, journal: { notes } });

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(note));
    expect(dispatch).toHaveBeenCalledWith(setActiveNote(note));

    // Delete from firebase
    const collectionRef = collection(FirebaseDB, PATH_NOTES(uid));
    const docs = await getDocs(collectionRef);

    console.log(process.env.REACT_APP_PROJECT_ID);

    const deletePromises = [];
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));

    await Promise.all(deletePromises);
  }, 10000);
});
