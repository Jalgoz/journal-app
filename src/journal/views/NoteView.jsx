import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';

import { ImageGallery } from '../components';
import { useForm } from '../../hooks/useForm';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startSaveNote } from '../../store/journal/thunks';

export const NoteView = () => {
  const dispatch = useDispatch();
  const { active: note, isSaving } = useSelector((state) => state.journal);
  const { onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(formState.date);
    return newDate.toUTCString();
  }, [formState.date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  return (
    <Grid 
      container 
      direction="row" 
      justifyContent="space-between"
      alignItems="center" 
      sx={{ mb: 1 }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item>
        <Typography fontSize={ 39 } fontWeight="light">{ dateString }</Typography>
      </Grid>

      <Grid item>
        <Button 
          color="primary" 
          sx={{ padding: 2 }}
          onClick={ onSaveNote }
          disabled={ isSaving }
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField 
          type="text" 
          variant="filled" 
          fullWidth 
          placeholder="Enter title"
          label="title"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={formState.title}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container>
        <TextField 
          type="text" 
          variant="filled" 
          fullWidth 
          multiline
          placeholder="What happen today?"
          minRows={5}
          sx={{ border: 'none', mb: 1 }}
          name="body"
          value={formState.body}
          onChange={onInputChange}
        />
      </Grid>

      {/* Image gallery */}
      <ImageGallery />
    </Grid>
  );
};
