import { configureStore } from '@reduxjs/toolkit';

import searchBarSlice from './slice/searchBar.slice';

const store = configureStore({
  reducer: {
    searchBar: searchBarSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
