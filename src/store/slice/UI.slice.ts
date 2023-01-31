/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type SidebarItems = 'lib' | 'search' | 'add-torrent';

export type Pages = 'home' | 'search' | 'torrent' | 'video' | 'signin';

interface UISlice {
  shareDrawer: {
    isOpen: boolean;
    torrentId: string;
  };
  currentPage: Pages;
  showSidebar: boolean;
}

// Define the initial state using that type
const initialState: UISlice = {
  shareDrawer: {
    isOpen: false,
    torrentId: '',
  },
  currentPage: 'home',
  showSidebar: false,
};

const uiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setShareDrawer: (
      state,
      action: PayloadAction<{ isOpen: boolean; torrentId?: string }>
    ) => {
      state.shareDrawer.isOpen = action.payload.isOpen;
      if (action.payload.torrentId) {
        state.shareDrawer.torrentId = action.payload.torrentId;
      }
    },
    setCurrentPage: (state, action: PayloadAction<Pages>) => {
      state.currentPage = action.payload;
    },
    setShowSidebar: (state, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload;
    },
  },
  //   extraReducers: builder => {
  //     builder.addCase(postVideoProgress.fulfilled, (state, action) => {
  //       state.progressTracker.lastUpdateTime = action.payload;
  //     });
  //   }
});

export const { setShareDrawer, setCurrentPage, setShowSidebar } =
  uiSlice.actions;

export default uiSlice.reducer;
