import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as usersServices from "../services/userServices";

const userInitialState = {
  loading: false,
  data: {},
  error: "",
  isLogged: false,
};

export const userLogin = createAsyncThunk(
  "LOGIN",
  usersServices.userLoginService
);

export const getUsers = createAsyncThunk(
  "GET_USERS",
  usersServices.getUsersService
);

export const signInUser = createAsyncThunk(
  "SIGN_IN",
  usersServices.signInUserSerice
);

export const persistUser = createAsyncThunk(
  "PERSIST",
  usersServices.persistUserSerice
);

export const logOut = createAsyncThunk(
  "LOGOUT",
  usersServices.logOutService
);

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.loading = false;
    },
    [userLogin.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [getUsers.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [signInUser.pending]: (state) => {
      state.loading = true;
    },
    [signInUser.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [signInUser.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [persistUser.pending]: (state) => {
      state.loading = true;
    },
    [persistUser.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLogged = true;
      state.loading = false;
    },
    [persistUser.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [logOut.pending]: (state) => {
      state.loading = true;
    },
    [logOut.fulfilled]: (state, action) => {
      state.data = {};
      state.isLogged = false;
      state.loading = false;
    },
    [logOut.rejected]: (state, action) => {
      state.error = action.error.message;
    },
  },
});

export default userSlice.reducer;
