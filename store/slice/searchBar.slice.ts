import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISearchBarSlice, Provider } from '../../@types/store';

// Define the initial state using that type
const initialState: ISearchBarSlice = {
  type: 'search',
  search: {
    query: '',
    torrentProvider: '1337x'
  },
  add: {
    magnet: ''
  }
};

const searchBarSlice = createSlice({
  name: 'searchbar',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.search.query = action.payload;
    },
    setSearchProvider: (state, action: PayloadAction<Provider>) => {
      state.search.torrentProvider = action.payload;
    },
    setMagnetLink: (state, action: PayloadAction<string>) => {
      //! validate magnet link
      state.add.magnet = action.payload;
    }
  }
});

export const { setSearchQuery, setSearchProvider, setMagnetLink } =
  searchBarSlice.actions;

export default searchBarSlice.reducer;
