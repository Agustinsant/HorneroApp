import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userSlice from "./user";
import buildingSlice from "./building";
import usersSlice from './users'

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userSlice,
    buildings: buildingSlice,
    users: usersSlice
  },
});

export default store;
