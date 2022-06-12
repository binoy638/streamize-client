import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  isAdmin: boolean;
  username: string;
  allocatedMemory: number;
}

interface UserSlice {
  user: User;
}

// Define the initial state using that type
const initialState: UserSlice = {
  user: {
    id: '',
    isAdmin: false,
    username: '',
    allocatedMemory: 0
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user.id = action.payload.id;
      state.user.isAdmin = action.payload.isAdmin;
      state.user.username = action.payload.username;
      state.user.allocatedMemory = action.payload.allocatedMemory;
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
