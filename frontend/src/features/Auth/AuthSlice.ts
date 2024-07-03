import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../services/APIResponseInterface";
import { useSelector } from "react-redux";

export const isAdmin = (): boolean => {
  return useSelector((state: any) =>
    state.auth.authorities.includes("ROLE_ADMIN")
  );
};
const initialState: AuthState = {
  authenticated: false,
  authorities: [],
  name: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthState: (state, payload) => {
      state.authenticated = payload.payload.authenticated;
      state.name = payload.payload.name;
      state.authorities = payload.payload.authorities;
    },
    logout: (state) => {
      state.authenticated = initialState.authenticated;
      state.name = initialState.name;
      state.authorities = initialState.authorities;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateAuthState, logout } = authSlice.actions;

export default authSlice.reducer;
