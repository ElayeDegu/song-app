import axios from 'axios';
import { Song } from '../features/songsSlice';

const apiUrl = 'http://localhost:5000/songs';

export const fetchSong = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const addSong = async (song: Song) => {
  const response = await axios.post(apiUrl, song);
  return response.data;
};

export const updateSong = async (song: Song) => {
  const response = await axios.put(`${apiUrl}/${song.id}`, song);
  return response.data;
};

export const deleteSong = async (id: number) => {
  await axios.delete(`${apiUrl}/${id}`);
};

export const songStats = async () => {
    const response = await axios.get('http://localhost:5000/stats');
    return response.data;
  };