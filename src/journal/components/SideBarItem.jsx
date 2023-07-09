import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { setActiveNote } from '../../store/journal/journalSlice';

const sliceText = (text, limit) => {
  return text.length > limit ? text.substring(0, limit) + '...' : text;
};

export const SideBarItem = ({ note }) => {
  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return sliceText(note.title, 17);
  }, [note.title]);

  const newBody = useMemo(() => {
    return sliceText(note.body, 25);
  }, [note.body]);

  const onClickNote = () => {
    dispatch(setActiveNote({ ...note }));
  };

  return (
    <ListItem disablePadding onClick={onClickNote}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container display="flex" flexDirection="column">
          <ListItemText primary={newTitle}/>
          <ListItemText secondary={newBody} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
