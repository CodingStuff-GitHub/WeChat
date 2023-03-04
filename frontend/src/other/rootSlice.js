import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const rootSlice = createSlice({
  name: "rootSlice",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.count += action.payload.number;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const { increment, decrement } = rootSlice.actions;

export const rootReducer = rootSlice.reducer;
