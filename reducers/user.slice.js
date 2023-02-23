import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {username: null, firstname: null,  password: null, token: null,   currentUser: null, photo: null},
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.username = action.payload.username;
      state.value.firstname = action.payload.firstname;
      state.value.password = action.payload.password;
      state.value.token = action.payload.token;
      
    },
    logout: (state) => {
        state.value.username = null;
        state.value.firstname = null;
        state.value.password = null;
        state.value.token = null;

        
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    photo: (state, action) => {
      state.value.photo = action.payload
    }
  },
});

export const { login, logout, setCurrentUser, photo} = usersSlice.actions;
export default usersSlice.reducer;
