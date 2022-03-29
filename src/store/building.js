import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as buildingServices from "../services/buildingServices";

const buildingsInitialState = {
  loading: false,
  error: "",
  data: [],
};

export const getBuildings = createAsyncThunk(
  "GET_BUILDINGS",
  buildingServices.getBuildings
);

const buildingSlice = createSlice({
  name: "building",
  initialState: buildingsInitialState,
  extraReducers: {
    [getBuildings.pending]: (state) => {
      state.loading = true;
    },
    [getBuildings.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getBuildings.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default buildingSlice.reducer;
