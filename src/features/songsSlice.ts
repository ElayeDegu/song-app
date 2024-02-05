import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: number;
}

export interface SongsState {
  songs: Song[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SongsState = {
  songs: [],
  status: "idle",
  error: null,
};

interface FetchSongsAction extends PayloadAction<Song[]> {}

interface AddSongAction extends PayloadAction<Song> {}

interface UpdateSongAction extends PayloadAction<number> {}

interface DeleteSongAction extends PayloadAction<number> {}

interface SetStatisticsAction {
  type: string;
  payload: { totalSongs: number; totalGenres: number };
}

type SongSliceActions =
  | FetchSongsAction
  | AddSongAction
  | UpdateSongAction
  | DeleteSongAction
  | SetStatisticsAction;

interface SongSliceState extends SongsState {
  statistics: { totalSongs: number; totalGenres: number; };
  fetching: boolean;
}

export const songsSlice = createSlice({
  name: "songs",
  initialState: { ...initialState, fetching: false } as SongSliceState,
  reducers: {
    fetchSongs: (state: SongSliceState) => {
      state.fetching = true;
    },
    fetchSongsSuccess: (state: SongSliceState, action: FetchSongsAction) => {
      state.songs = action.payload;
      state.fetching = false;
    },
    addSong: (state: SongSliceState, action: AddSongAction) => {
      state.songs.push(action.payload);
    },
   
    updateSong: (state, action: { payload: Song }) => {
      const index = state.songs.findIndex((song: Song) => song.id === action.payload.id);
      if (index !== -1) {
        state.songs[index] = {
          ...state.songs[index],
          title: 'Updated Song',
          genre: 'Updated Genre',
        };
      }
    },
    deleteSong: (state: SongSliceState, action: DeleteSongAction) => {
      const index = state.songs.findIndex(
        (song: Song) => song.id === action.payload
      );
      if (index !== -1) {
        state.songs.splice(index, 1);
      }
    },
    setStatistics: (state: SongSliceState, action: SetStatisticsAction) => {
      state.statistics = action.payload;
    },
  },
});

export const {
  fetchSongs,
  fetchSongsSuccess,
  addSong,
  updateSong,
  deleteSong,
  setStatistics,
} = songsSlice.actions;

export default songsSlice.reducer;