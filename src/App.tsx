import React, { useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { addSong, updateSong, deleteSong } from './api/songApi';
import { addSong as addSongAction, updateSong as updateSongAction, deleteSong as deleteSongAction } from './features/songsSlice';
import { RootState } from './store/store';
import SongForm from './components/SongForm';
import SongsList from './components/SongList';
import Statistics from './components/Statistics';
import { Song } from './Song';

const App: React.FC = () => {
  const [songIdToUpdate, setSongIdToUpdate] = useState<number | null>(null);
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.songs);

  const handleAddSong = async (song: Song) => {
    dispatch(await addSong(song));
  };

  const handleUpdateSong = (song: Song) => {
    dispatch(updateSongAction(song));
  };

  const handleDeleteSong = (songId: number) => {
    dispatch(deleteSongAction(songId));
  };

  const handleEditSong = (songId: number) => {
    setSongIdToUpdate(songId);
  };

  const handleCancelEditSong = () => {
    setSongIdToUpdate(null);
  };

  return (
    <div>
      <h1>Songs</h1>
      <SongsList
        songs={songs}
        onAddSong={handleAddSong}
        onEditSong={handleEditSong}
        onDeleteSong={handleDeleteSong}
      />
      {songIdToUpdate !== null && (
        <SongForm
          songId={songIdToUpdate}
          onSubmit={handleUpdateSong}
          onCancel={handleCancelEditSong}
        />
      )}
      {songIdToUpdate === null && (
        <SongForm onSubmit={handleAddSong} onCancel={function (): void {
          throw new Error('Function not implemented.');
        } } />
      )}
      < Statistics />
    </div>
  );
};

export default App;
