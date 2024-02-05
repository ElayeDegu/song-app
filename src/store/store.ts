import { Store, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../features/songsSaga';
import songsReducer, {SongsState} from '../features/songsSlice';

const sagaMiddleware = createSagaMiddleware();

export const store: Store<RootStateInterface> = configureStore({
  reducer: {
    songs: songsReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(sagaMiddleware),
});
// });
export interface RootStateInterface  {
  songs: SongsState;
  // Add other state properties here
}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);