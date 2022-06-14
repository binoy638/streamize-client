import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UISlice {
  shareDrawer: {
    isOpen: boolean;
    torrentId: string;
  };
}

// Define the initial state using that type
const initialState: UISlice = {
  shareDrawer: {
    isOpen: false,
    torrentId: ''
  }
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
    }
  }
  //   extraReducers: builder => {
  //     builder.addCase(postVideoProgress.fulfilled, (state, action) => {
  //       state.progressTracker.lastUpdateTime = action.payload;
  //     });
  //   }
});

export const { setShareDrawer } = uiSlice.actions;

export default uiSlice.reducer;
