import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as buildingServices from "../services/buildingServices";
import { updateHours, addDayWeek ,removeDayWeek, singleBuilding} from "../services/adminServices";

const buildingsInitialState = {
  loading: false,
  error: "",
  data: [],
  closetsBuilding: [],
  singleBuilding: {}
};

export const getBuildings = createAsyncThunk(
  "GET_BUILDINGS",
  buildingServices.getBuildings
);

export const getClosestBildings = createAsyncThunk(
  "GET_CLOSEST_BUILDING",
  buildingServices.getClosestBildingsServices
)

export const updateHoursBilding = createAsyncThunk("UPDATE_HOURS",updateHours)
export const addDayWeekBuilding = createAsyncThunk("ADD_DAYS",addDayWeek)
export const removeDayWeekBuilding = createAsyncThunk("REMOVE_DAYS",removeDayWeek)
export const getSingleBuilding = createAsyncThunk("SINGE_BUILDING", singleBuilding)

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
    [updateHoursBilding.pending]: (state) => {
      state.loading = true;
    },
    [updateHoursBilding.fulfilled]: (state, action) => {
      state.loading = false;
      state.singleBuilding = action.payload;
    },
    [updateHoursBilding.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [addDayWeekBuilding.pending]: (state) => {
      state.loading = true;
    },
    [addDayWeekBuilding.fulfilled]: (state, action) => {
      state.loading = false;
      state.singleBuilding = action.payload;
    },
    [addDayWeekBuilding.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [removeDayWeekBuilding.pending]: (state) => {
      state.loading = true;
    },
    [removeDayWeekBuilding.fulfilled]: (state, action) => {
      state.loading = false;
      state.singleBuilding = action.payload;
    },
    [removeDayWeekBuilding.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [getSingleBuilding.pending]: (state) => {
      state.loading = true;
    },
    [getSingleBuilding.fulfilled]: (state, action) => {
      state.loading = false;
      state.singleBuilding = action.payload;
    },
    [getSingleBuilding.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    }
  },
});

export default buildingSlice.reducer;
