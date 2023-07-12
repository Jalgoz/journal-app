import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Delete, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';

import { ImageGallery } from '../components';
import { useForm } from '../../hooks/useForm';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startSaveNote, startUploadingFiles, startDeletingNote } from '../../store/journal/thunks';
import { deleteAlert } from '../../helpers/alerts';

export const NoteView = () => {
  const dispatch = useDispatch();
  const { active: note, isSaving } = useSelector((state) => state.journal);
  const { onInputChange, formState } = useForm(note);
  // We use the useRef to simulate a click when we click on customize button to upload the images
  const fileInputRef = useRef();

  // const noteWithImageUrls = notes.find((note) => note.id === formState.id);
  const dateString = useMemo(() => {
    const newDate = new Date(formState.date);
    return newDate.toUTCString();
  }, [formState.date]);

  const onSaveNote = async () => {
    dispatch(startSaveNote(formState));
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) { 
      return; 
    }
    dispatch(startUploadingFiles(target.files));
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
        <Typography fontSize={ 39 } fontWeight="light">
          { dateString }
        </Typography>
      </Grid>

      <Grid item>
        <input 
          type="file" 
          multiple
          // We create the ref
          ref={fileInputRef}
          onChange={onFileInputChange} 
          style={{ display: 'none' }}
        />

        <IconButton 
          color="primary" 
          disabled={isSaving}
          // We call the ref and we simulate the click
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

        <Button 
          color="primary" 
          sx={{padding: 2}}
          onClick={onSaveNote}
          disabled={isSaving}
        >
          <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
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
          sx={{border: 'none', mb: 1}}
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
          sx={{border: 'none', mb: 1}}
          name="body"
          value={formState.body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button
          onClick={onDeleteNote}
          color="error"
          sx={{ mt: 2}}
          disabled={isSaving}
        >
          <Delete sx={{ mr: .7 }} />
          Delete
        </Button>
      </Grid>

      <ImageGallery images={note.imageUrls} />
    </Grid>
  );
};
