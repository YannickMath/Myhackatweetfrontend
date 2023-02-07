import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const tweetsSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    addTweet: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addTweet } = tweetsSlice.actions;
export default tweetsSlice.reducer;
