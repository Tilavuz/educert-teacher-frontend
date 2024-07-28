import { WorkTableInterface } from "@/interfaces/work-table-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface WorkTableState {
    loading: boolean,
    error: string | null,
    worktables: WorkTableInterface[] | null,
}

const initialState: WorkTableState = {
  loading: false,
  error: null,
  worktables: null,
};

const worktableSlice = createSlice({
  name: "worktable",
  initialState,
  reducers: {
    getWorkTables: (state, action: PayloadAction<WorkTableInterface[]>) => {
      state.worktables = action.payload;
    },
    isWorkTablePending: (state) => {
      (state.loading = true), (state.error = null);
    },
    workTablefial: (state, action: PayloadAction<string>) => {
      (state.error = action.payload), (state.loading = false);
    },
  },
});


export const {
  getWorkTables,
  isWorkTablePending,
  workTablefial,
} = worktableSlice.actions;

export default worktableSlice.reducer