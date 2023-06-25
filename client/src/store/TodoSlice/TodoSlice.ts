import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoState, ITodo } from "../../utils/interfaces";


const initialState: ITodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction< ITodo[] >) => {
      state.todos = action.payload;
    },
    setNewTodo: (state, action: PayloadAction<ITodo>) => {
      const newTodo = action.payload;
      console.log(newTodo)
      state.todos.unshift(newTodo);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const todoId = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },
  },
});

export const { setNewTodo, setTodos, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
