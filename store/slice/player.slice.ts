import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Progress {
  currentTime: number;
  lastUpdate: number;
}

interface PlayerSlice {
  progressTracker: Progress;
}

// Define the initial state using that type
const initialState: PlayerSlice = {
  progressTracker: {
    currentTime: 0,
    lastUpdate: 0
  }
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<number>) => {
      state.progressTracker.currentTime = action.payload;
      //   state.progressTracker.lastUpdate = action.payload.lastUpdate;
    }
  }
});

export const { setProgress } = playerSlice.actions;

export default playerSlice.reducer;
