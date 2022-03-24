import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as usersServices from '../services/userServices'

const userInitialState = {
  loading: false,
  data: {},
  error: ''
};

export const userLogin = createAsyncThunk('LOGIN', usersServices.userLoginService)

export const getUsers = createAsyncThunk('GET_USERS', usersServices.getUsersService)

export const signInUser = createAsyncThunk('SIGN_IN', usersServices.signInUserSerice)

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    extraReducers:{
        [userLogin.pending]: state => {
          state.loading = true  
        },
        [userLogin.fulfilled]: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        [userLogin.rejected]: (state, action) => {
            state.error = action.error.message
        },
        [getUsers.pending]: state => {
          state.loading = true  
        },
        [getUsers.fulfilled]: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        [getUsers.rejected]: (state, action) => {
            state.error = action.error.message
        },
        [signInUser.pending]: state => {
          state.loading = true  
        },
        [signInUser.fulfilled]: (state, action) => {
            state.loading = false
        },
        [signInUser.rejected]: (state, action) => {
            state.error = action.error.message
        }

    }
})

export default userSlice.reducer
