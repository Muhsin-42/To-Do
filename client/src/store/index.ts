import { combineReducers } from "@reduxjs/toolkit";
import tasksReducer from "./TaskSlice/store";

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
