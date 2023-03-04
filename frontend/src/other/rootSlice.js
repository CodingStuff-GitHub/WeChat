import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChatId: 0,
};

const rootSlice = createSlice({
  name: "rootSlice",
  initialState,
  reducers: {
    selectChat: (state, action) => {
      state.selectedChatId = action.payload.selectedChatId;
    },
  },
});

export const { selectChat } = rootSlice.actions;

export const rootReducer = rootSlice.reducer;
