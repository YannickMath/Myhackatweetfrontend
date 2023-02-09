import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const tweetsSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    addTweet: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    // removeTweet: (state, action) => {
    //   const index = state.value.findIndex(
    //     (tweet) => tweet.id === action.payload
    //   );
    //   if (index !== -1) {
    //     state.value.splice(index, 1);
    //   }
    // },
    // deleteTweet: (state, action) => {
    //   state.value = state.value.filter((elmt) => elmt.id !== action.payload);
    // },
  },
});

export const { addTweet, removeTweet, deleteTweet } = tweetsSlice.actions;
export default tweetsSlice.reducer;
