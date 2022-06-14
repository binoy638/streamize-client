import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { postVideoProgress } from '../thunk/player.thunk';

interface Progress {
  currentTime: number;
  nextUpdateTime: number; //* next timestamp that needs to be sent to the server to save user progress (need better name)
  lastUpdateTime: number; //* last timestamp that was sent to the server to save user progress
}

interface PlayerSlice {
  progressTracker: Progress;
}

// Define the initial state using that type
const initialState: PlayerSlice = {
  progressTracker: {
    currentTime: 0,
    nextUpdateTime: 0,
    lastUpdateTime: 0
  }
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<number>) => {
      const currentTime = action.payload;
      state.progressTracker.currentTime = currentTime;
      if (currentTime % 5 === 0) {
        state.progressTracker.nextUpdateTime = currentTime;
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(postVideoProgress.fulfilled, (state, action) => {
      state.progressTracker.lastUpdateTime = action.payload;
    });
  }
});

export const { setProgress } = playerSlice.actions;

export default playerSlice.reducer;
