import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import styled from '@emotion/styled';
import axios from 'axios';

const StatisticWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatisticItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
`;

const StatisticTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const StatisticValue = styled.p`
  font-size: 1rem;
  color: #666;
`;

interface StatisticsProps {}

const Statistics: React.FC<StatisticsProps> = () => {
  const songs = useSelector((state: RootState) => state.songs.songs);
  const numberOfSongs = songs.length;
  const totalDuration = songs.reduce((acc, song) => acc + song.duration, 0);

  const [songss, setSongs] = useState({ totalSongs: 0 , songsPerGenre: [], songsPerArtist : [], songsPerAlbum : []});

const apiUrl = 'http://localhost:5000/stats';
useEffect(() => {
  fetchSong();
}, []);
const fetchSong = async () => {
  const {data} = await axios.get(apiUrl);
  console.log('---------', data);
  // const tottalSongss = data.totalSongs;
  setSongs(data);
  return data;
}
const numberOfSon = songss.totalSongs;
const songsPerGenre = songss.songsPerGenre;
console.log('Genre', songsPerGenre)
const songsPerArtist = songss.songsPerArtist;
console.log('Artist', songsPerArtist)
const songsPerAlbum = songss.songsPerAlbum;
console.log('Album', songsPerAlbum)
  return (
    <><pre>{JSON.stringify(songss, null, 4)}</pre><StatisticWrapper>
      <StatisticItem>
        <StatisticTitle>Number of songs</StatisticTitle>
        <StatisticValue>{numberOfSon}</StatisticValue>
      </StatisticItem>
      <StatisticItem>
          <StatisticTitle>Songs Per Genre</StatisticTitle>
          <ul>
            {songsPerGenre.map((genre: any, index) => (
              <StatisticValue key={index}>{genre._id} : {genre.count}</StatisticValue>
            ))}
          </ul>
        </StatisticItem>
        <StatisticItem>
          <StatisticTitle>Songs Per Artist</StatisticTitle>
          <ul>
            {songsPerArtist.map((artist: any, index) => (
              <StatisticValue key={index}>{artist._id} : {artist.count}</StatisticValue>
            ))}
          </ul>
        </StatisticItem>
        <StatisticItem>
          <StatisticTitle>Songs Per Album</StatisticTitle>
          <ul>
            {songsPerAlbum.map((album: any, index) => (
              <StatisticValue key={index}>{album._id} : {album.count}</StatisticValue>
            ))}
          </ul>
        </StatisticItem>
      <StatisticItem>
        <StatisticTitle>Total duration</StatisticTitle>
        <StatisticValue>{totalDuration} seconds</StatisticValue>
      </StatisticItem>
    </StatisticWrapper></>
  );
};

export default Statistics;