import { configureStore } from "@reduxjs/toolkit";

import searchBarSlice from "./slice/searchBar.slice";
import UISlice from "./slice/UI.slice";

const store = configureStore({
  reducer: {
    searchBar: searchBarSlice,
    UI: UISlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
