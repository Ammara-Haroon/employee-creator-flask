import { createSlice } from "@reduxjs/toolkit";
import { Department } from "../../services/APIResponseInterface";

export interface Departments {
  departments: Department[];
}

const initialState: Departments = {
  departments : []
};

export const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    setDepartments: (state, payload) => {
      state.departments = [...payload.payload];
    },
   
  },
});

// Action creators are generated for each case reducer function
export const { setDepartments } = departmentsSlice.actions;

export default departmentsSlice.reducer;
