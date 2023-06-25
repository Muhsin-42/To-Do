import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TasksState } from "../../utils/interfaces";

const initialState: TasksState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<{ tasks: Task[] }>) => {
      state.tasks = action.payload.tasks;
    },
    setNewTask: (state, action: PayloadAction< Task >) => {
      const newTask = action.payload;
      if (state.tasks) {
        state.tasks.unshift(newTask);
      } else {
        state.tasks = [newTask];
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      state.tasks = state && state.tasks && state?.tasks?.filter(task => task.id !== taskId);
    },
  },
});

export const { setNewTask, setTasks, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;