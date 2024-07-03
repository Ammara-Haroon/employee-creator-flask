import { createSlice } from "@reduxjs/toolkit";

export interface NotificationState {
  display: boolean;
  message: string | null;
}

const initialState: NotificationState = {
  display: false,
  message: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    show: (state, payload) => {
      state.display = true;
      state.message = payload.payload;
    },
    hide: (state) => {
      state.display = false;
      state.message = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { show, hide } = notificationSlice.actions;

export default notificationSlice.reducer;
