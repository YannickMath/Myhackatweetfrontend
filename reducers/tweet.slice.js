import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [{text: null, firstname: null, id: null,username: null, like: false}],
  like: false
};

export const tweetsSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    addTweet: (state, action) => {
      
      state.value.push({text: action.payload, firstname: action.payload, username: action.payload, id: action.payload});
    },
    deleteTweet: (state, action) => {
      state.value = state.value.filter((elmt) => elmt.id !== action.payload);
    },
    likeTweet: (state, action) => {
      state.like = !state.like;
    },
    removeAllTweet: (state) => {
      state.value = []
    }

  }
});


export const { addTweet, deleteTweet, likeTweet, removeAllTweet } = tweetsSlice.actions;
export default tweetsSlice.reducer;

