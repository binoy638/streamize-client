import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUIState } from "../../@types/store";

const initialState: IUIState = {
  snackbar: {
    show: false,
    message: "",
    type: "success",
  },
};

const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    toggleSnackbar: (state, action: PayloadAction<"show" | "hide">) => {
      if (action.payload === "show") {
        state.snackbar.show = true;
      } else {
        state.snackbar.show = false;
      }
    },
    setSnackbarMessage: (
      state,
      action: PayloadAction<{
        message: string;
        type: "success" | "error" | "info";
      }>
    ) => {
      const { message, type } = action.payload;
      state.snackbar.message = message;
      state.snackbar.type = type;
    },
  },
});

export const { toggleSnackbar, setSnackbarMessage } = UISlice.actions;

export default UISlice.reducer;
