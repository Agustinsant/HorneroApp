import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as buildingServices from "../services/buildingServices";

const buildingsInitialState = {
  loading: false,
  error: "",
  data: [],
  closetsBuilding: []
};

export const getBuildings = createAsyncThunk(
  "GET_BUILDINGS",
  buildingServices.getBuildings
);

export const getClosestBildings = createAsyncThunk(
  "GET_CLOSEST_BUILDING",
  buildingServices.getClosestBildingsServices
)

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
    [getClosestBildings.pending]: (state) => {
      state.loading = true;
    },
    [getClosestBildings.fulfilled]: (state, action) => {
      state.loading = false;
      state.closetsBuilding = action.payload;
    },
    [getClosestBildings.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default buildingSlice.reducer;
