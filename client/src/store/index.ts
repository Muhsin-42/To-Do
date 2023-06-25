import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "./TodoSlice/TodoSlice";

const rootReducer = combineReducers({
  todos: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
