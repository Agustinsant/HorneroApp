import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as usersServices from "../services/usersServices";

const usersInitialState = {
  loading: false,
  data: [],
  error: "",
};

export const searchUsers = createAsyncThunk(
  "SEARCH_USERS",
  usersServices.searchUsersService
);



const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  extraReducers: {
    [searchUsers.pending]: (state) => {
      state.loading = true;
    },
    [searchUsers.fulfilled]: (state, action) => {
      state.data = action.payload.docs;
      state.loading = false;
    },
    [searchUsers.rejected]: (state, action) => {
      state.error = action.error.message;
    }
  },
});

export default usersSlice.reducer;
