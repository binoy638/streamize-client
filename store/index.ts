import { configureStore } from '@reduxjs/toolkit';

import playerSlice from './slice/player.slice';
import userSlice from './slice/user.slice';

const store = configureStore({
  reducer: {
    user: userSlice,
    player: playerSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
