import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {username: null},
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.username = action.payload.username;
    },
    logout: (state, action) => {
        state.value.username = null;
        
    }
  },
});

export const { login, logout } = usersSlice.actions;
export default usersSlice.reducer;
