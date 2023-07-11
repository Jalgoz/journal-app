import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { startNewNote } from '../../store/journal/thunks';

import { addIconButtonStyle } from './style';

export const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving, active } = useSelector((state) => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {active !== null ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        onClick={onClickNewNote}
        size="large"
        disabled={isSaving}
        sx={addIconButtonStyle}
      >
        <AddOutlined fontSize="30px" />
      </IconButton>
    </JournalLayout>
  );
};
