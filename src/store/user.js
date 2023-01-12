import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as userServices from "../services/userServices";

const userInitialState = {
  loading: false,
  data: {},
  friends:[],
  error: "",
  isLogged: false,
};

export const userLogin = createAsyncThunk(
  "LOGIN",
  userServices.userLoginService
);

export const signInUser = createAsyncThunk(
  "SIGN_IN",
  
  userServices.signInUserSerice
);

export const persistUser = createAsyncThunk(
  "PERSIST",
  userServices.persistUserSerice
);

export const logOut = createAsyncThunk("LOGOUT", userServices.logOutService);

export const editUser = createAsyncThunk(
  "EDIT_USER",
  userServices.editUserService
);

export const addFriend = createAsyncThunk("ADD_FRIEND", userServices.addFriendService);

export const editUserPassword = createAsyncThunk(
  "EDIT_USER_PASSWORD",
  userServices.editUserPasswordService
);

export const toogleCheck = createAsyncThunk(
  'TOOGLE-CHECK',
  userServices.checkValidateService
)

export const removeFriend = createAsyncThunk("REMOVE_FRIEND", userServices.removeFriendService)

export const getAllFriends = createAsyncThunk("GET_ALL_FRIENDS", userServices.getAllFriendsService)

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.isLogged = true;
      state.loading = false;
    },
    [userLogin.rejected]: (state, action) => {
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
    [editUser.pending]: (state) => {
      state.loading = true;
    },
    [editUser.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [editUser.rejected]: (state, action) => {
      state.error = action.error.message;
    },

    [addFriend.pending]: (state) => {
      state.loading = true;
    },
    [addFriend.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [addFriend.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [removeFriend.pending]: (state) => {
      state.loading = true;
    },
    [removeFriend.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [removeFriend.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [getAllFriends.pending]: (state) => {
      state.loading = true;
    },
    [getAllFriends.fulfilled]: (state, action) => {
      state.friends = action.payload;
      state.loading = false;
    },
    [getAllFriends.rejected]: (state, action) => {
      state.error = action.error.message;
    },

    [editUserPassword.pending]: (state) => {
      state.loading = true;
    },
    [editUserPassword.fulfilled]: (state, action) => {
      state.data = action.payload
      state.loading = false;
    },
    [editUserPassword.rejected]: (state, action) => {

      state.error = action.error.message;
    },
    [toogleCheck.pending]: (state) => {
      state.loading = true;
    },
    [toogleCheck.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [toogleCheck.rejected]: (state, action) => {
      state.error = action.error.message;
    },
  },
});

export default userSlice.reducer;