import { combineReducers } from "@reduxjs/toolkit";

import { UserSlice } from "./slices";

export const rootReducer = combineReducers({
  user: UserSlice,
});
