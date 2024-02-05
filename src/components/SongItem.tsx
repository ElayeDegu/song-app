import React from 'react';
import { Song } from '../features/songsSlice';
import styled from '@emotion/styled';
import { Button} from '@material-ui/core';
interface SongItemProps {
  song: Song;
  onEdit: () => void;
  onDelete: () => void;
}

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SongListItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const SongTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const SongArtist = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 5px;
`;

const SongGenre = styled.p`
  font-size: 0.9rem;
  color: #999;
`;

interface SongProps {
  id?: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
}


const SongItem: React.FC<SongItemProps> = ({ song, onEdit, onDelete }) => {
  return (
    <ListWrapper>
      <SongListItem key={song.id}>
        <SongTitle> Song Title:{song.title}</SongTitle>
        <SongTitle>Song Album:{song.album}</SongTitle>
        <SongArtist>Song Artist:{song.artist}</SongArtist>
        <SongGenre>Song Genre:{song.genre}</SongGenre>
      </SongListItem>
      <Button type="submit" variant="contained" color="primary" onClick={onEdit}>Add</Button>
      <Button type="submit" variant="contained" color="secondary" onClick={onDelete}>Delete</Button>
    </ListWrapper>
  );
};
export default SongItem;
