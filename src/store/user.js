import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as usersServices from '../services/userServices'

const userInitialState = {
  loading: false,
  data: {},
  error: ''
};

export const userLogin = createAsyncThunk('LOGIN', usersServices.userLoginService)

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

    }
})

export default userSlice.reducer
