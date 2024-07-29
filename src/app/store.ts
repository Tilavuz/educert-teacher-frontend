import { configureStore } from "@reduxjs/toolkit";
import workTableReducer from "@/features/worktable/work-table-slice";
import authReducer from "@/features/auth/auth-slice";
import groupReducer from "@/features/group/group-slice";
import groupTaskReducer from "@/features/group-task/group-task-slice";

export const store = configureStore({
  reducer: {
    worktable: workTableReducer,
    auth: authReducer,
    group: groupReducer,
    tasks: groupTaskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
