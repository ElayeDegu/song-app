import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import SongItem from './SongItem';
import { Song } from '../Song';
import { Button} from '@material-ui/core';
import axios from 'axios';
interface SongsListProps {
  songs: Song[];
  onAddSong: (songss: Song) => void;
  onEditSong: (songId: number) => void;
  onDeleteSong: (songId: number) => void;
}

const SongsList: React.FC<SongsListProps> = ({ songs ,onAddSong, onEditSong, onDeleteSong }) => {
//   const songs = useSelector((state: RootState) => state.songs.songs);
const [songss, setSongs] = useState([]);

const apiUrl = 'http://localhost:5000/songs';
useEffect(() => {
  fetchSong();
}, []);
const fetchSong = async () => {
  const {data} = await axios.get(apiUrl);
  console.log('---------', data);
  setSongs(data);
  return data;
};
  return (
    <> <pre>{JSON.stringify(songss, null, 4)}</pre>
    <div>
          <><h2>Songs</h2><Button type="submit" variant="contained" color="primary"
              onClick={() => onAddSong({
                  title: 'New Title', artist: 'New Artist', album: 'New Album', duration: 0,
                  genre: 'New Genre',
                  id: 0
              })}
          >Add Song</Button><ul>
                  {songss.map((song: Song) => (
                      <SongItem
                          key={song.id}
                          song={song}
                          onEdit={() => onEditSong(song.id)}
                          onDelete={() => onDeleteSong(song.id)} />
                  ))}
              </ul></>
      </div></>
  );
};

export default SongsList;