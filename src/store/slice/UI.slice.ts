/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type SidebarItems = 'home' | 'lib' | 'search' | 'add-torrent';

interface UISlice {
  shareDrawer: {
    isOpen: boolean;
    torrentId: string;
  };
  sidebar: {
    activeItem: SidebarItems;
  };
}

// Define the initial state using that type
const initialState: UISlice = {
  shareDrawer: {
    isOpen: false,
    torrentId: '',
  },
  sidebar: {
    activeItem: 'home',
  },
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
    setActiveItem: (state, action: PayloadAction<SidebarItems>) => {
      state.sidebar.activeItem = action.payload;
    },
  },
  //   extraReducers: builder => {
  //     builder.addCase(postVideoProgress.fulfilled, (state, action) => {
  //       state.progressTracker.lastUpdateTime = action.payload;
  //     });
  //   }
});

export const { setShareDrawer, setActiveItem } = uiSlice.actions;

export default uiSlice.reducer;
