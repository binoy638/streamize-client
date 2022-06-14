import { createAsyncThunk } from '@reduxjs/toolkit';

import { postUserVideoProgress } from '../../API';

// redux thunk action to search items
export const postVideoProgress = createAsyncThunk(
  'player/postVideoProgress',
  async (args: { videoSlug: string; progress: number }) => {
    try {
      await postUserVideoProgress(args.videoSlug, args.progress);

      return args.progress;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
