import { useEffect, useMemo } from 'react'

import { deleteAlert, simpleErrorAlert } from '../../helpers/alerts';
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks';
import { setActiveNote } from '../../store/journal/journalSlice';
import { ERROR_FILE_EXTENSION, ERROR_FILE_SIZE, MAX_FILE_SIZE, VALID_EXTENSIONS } from '../../constants/constants';

const useNoteView = (formState, dispatch) => {
  const dateString = useMemo(() => {
    const newDate = new Date(formState.date);
    return newDate.toUTCString();
  }, [formState.date]);

  const onSaveNote = async () => {
    dispatch(startSaveNote(formState));
  };

  const onFileInputChange = ({ target }) => {
    const files = [...target.files];
    let isValidFile = true;
    
    if (files === 0) { 
      return; 
    }

    files.forEach((file) => {
      const fileName = file.name.toLowerCase();
      const fileSize = file.size / 1024 / 1024;

      if (!VALID_EXTENSIONS.some((ext) => fileName.includes(ext))) {
        simpleErrorAlert('Error', ERROR_FILE_EXTENSION);
        isValidFile = false;
        return;
      }

      if (fileSize > MAX_FILE_SIZE) {
        simpleErrorAlert('Error', ERROR_FILE_SIZE);
        isValidFile = false;
        return;
      }
    });

    if (isValidFile) {
      dispatch(startUploadingFiles(target.files));
    }
  };

  const onDeleteNote = () => {
    deleteAlert()
      .then(() => {
        dispatch(startDeletingNote());
      });
  };

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState, dispatch]);

  return {
    dateString,
    onDeleteNote,
    onFileInputChange,
    onSaveNote
  };
};

export default useNoteView;
