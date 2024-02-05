import { all, takeLatest, put, call, take } from "redux-saga/effects";
// import { addSong as addSongAction, updateSong as updateSongAction, deleteSong as deleteSongAction, fetchSong as fetchSongAction, songStats as statsSongAction } from "../features/songsSlice";
import { addSong, updateSong, deleteSong, fetchSong, songStats } from "../api/songApi";
import { Song } from "../Song";


function* fetchSongsSaga(): Generator<any> {
    try {
      const songs = yield call(fetchSong);
      yield put({ type: 'songs/fetchSongsSuccess', payload: songs });
    } catch (error) {
      yield put({ type: 'songs/fetchSongsFailure', payload: error });
    }
  }
function* addSongSaga({ payload }: { payload: Song }): Generator<any> {
    try {
        yield take('ADD_SONG_SAGA');
      const newSong = yield call(addSong, payload);
      yield put({ type: 'songs/addSongSuccess', payload: newSong });
    } catch (error) {
      yield put({ type: 'songs/addSongFailure', payload: error });
    }
  }

  function* updateSongSaga({ payload }: { payload: Song }): Generator<any> {
    try {
      const updatedSong = yield call(updateSong, payload);
      yield put({ type: 'songs/updateSongSuccess', payload: updatedSong });
    } catch (error) {
      yield put({ type: 'songs/updateSongFailure', payload: error });
    }
  }
  
  function* deleteSongSaga({ payload }: { payload: number }): Generator<any> {
    try {
      const songs = yield call(deleteSong, payload);
      yield put({ type: 'songs/deleteSongSuccess', payload: songs });
    } catch (error) {
      yield put({ type: 'songs/deleteSongFailure', payload: error });
    }
  }
  function* fetchSongsStats(): Generator<any> {
    try {
      const songs = yield call(songStats);
      yield put({ type: 'songs/fetchSongsSuccess', payload: songs });
    } catch (error) {
      yield put({ type: 'songs/fetchSongsFailure', payload: error });
    }
  }

export function* rootSaga() {
    yield all([
      takeLatest('songs/fetchSongs', fetchSongsSaga),
      takeLatest('songs/fetchSongs', fetchSongsStats),
    //   takeLatest('songsSaga/addSong', addSongSaga),
    //   takeLatest('songs/updateSongs', updateSongSaga),
    //   takeLatest('songs/deleteSong', deleteSongSaga),
    ]);
  }
