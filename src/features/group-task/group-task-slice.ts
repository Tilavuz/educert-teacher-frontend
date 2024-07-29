import { TaskInterface } from "@/interfaces/task-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskState {
  loading: boolean;
  error: string | null;
  tasks: TaskInterface[] | null;
  groupTasks: TaskInterface[] | null;
}

const initialState: TaskState = {
  loading: false,
  error: null,
  tasks: null,
  groupTasks: null,
};

const taskslice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskInterface>) => {
      if (state.groupTasks) {
        state.groupTasks.push(action.payload);
      } else {
        state.groupTasks = [action.payload];
      }
      state.loading = false;
    },
    changeTask: (state, action: PayloadAction<TaskInterface>) => {
      if (state.groupTasks) {
        state.groupTasks = state.groupTasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      }
      state.loading = false;
    },
    removeTask: (state, action: PayloadAction<string>) => {
      if (state.groupTasks) {
        state.groupTasks = state.groupTasks.filter(
          (task) => task._id !== action.payload
        );
      }
      state.loading = false;
    },
    getTasks: (state, action: PayloadAction<TaskInterface[]>) => {
      state.tasks = action.payload;
    },
    getGroupTasks: (state, action: PayloadAction<TaskInterface[]>) => {
      state.groupTasks = action.payload;
    },
    isGroupPending: (state) => {
      (state.loading = true), (state.error = null);
    },
    groupfial: (state, action: PayloadAction<string>) => {
      (state.error = action.payload), (state.loading = false);
    },
  },
});

export const {
  addTask,
  groupfial,
  isGroupPending,
  getTasks,
  removeTask,
  changeTask,
  getGroupTasks,
} = taskslice.actions;

export default taskslice.reducer;
