import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addSong, updateSong, deleteSong, } from '../features/songsSlice';
import { fetchSong } from '../api/songApi';
import { Song } from '../Song';
import styled from '@emotion/styled';
import { Button, TextField } from '@material-ui/core';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

interface SongFormProps {
  initialValues?: Song;
  onSubmit: (song: Song) => void;
  onCancel: () => void;
  songId?: number;
}

const SongForm: React.FC<SongFormProps> = ({ initialValues, onSubmit, onCancel, songId }) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [artist, setArtist] = useState(initialValues?.artist || '');
  const [genre, setGenre] = useState(initialValues?.genre || '');
  const [album, setAlbum] = useState(initialValues?.album || '');
  const [duration, setDuration] = useState(initialValues?.duration || 0);
  const [id, setId] = useState(initialValues?.id || 0);
  const dispatch = useDispatch();

  const isEditMode = initialValues !== undefined;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id > 0) {
      dispatch(updateSong({
          id: 0, title, artist, album, duration,
          genre
      }));
    } else {
      dispatch(addSong({
          title, artist, album, duration,
          id: 0,
          genre
      }));
    }
    onSubmit({
        id, title, artist, album, duration,
        genre
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleDelete = () => {
    dispatch(deleteSong(id));
    onCancel();
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <FieldWrapper>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FieldWrapper>
      <FieldWrapper>
        <TextField
          label="Album"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          required
        />
        </FieldWrapper>
      <FieldWrapper>
        <TextField
          label="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
      </FieldWrapper>
      <FieldWrapper>
        <TextField
          label="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
      </FieldWrapper>
      {id === null && (
        <>
          <Button type="submit" variant="contained" color="primary" onClick={handleDelete}>
            Delete
          </Button>
          <Button type="submit">Update</Button>
        </>
      )}
      {id === null && <Button type="submit" variant="contained" color="primary">Add</Button>}

      <Button type="submit" variant="contained" color="secondary" onClick={handleCancel}>
        Cancel
      </Button>
    </FormWrapper>
  );
};

export default SongForm;