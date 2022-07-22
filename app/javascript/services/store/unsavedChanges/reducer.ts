import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "unsavedChanges",
  initialState: false,
  reducers: {
    turnOn: (state) => {
      state = true;
      return state;
    },
    turnOff: (state) => {
      state = false;
      return state;
    },
  },
});

export const { turnOff, turnOn } = slice.actions;

export const reducer = slice.reducer;
