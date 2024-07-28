import { GroupInterface } from "@/interfaces/group-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GroupState {
  loading: boolean;
  error: string | null;
  groups: GroupInterface[] | null;
}

const initialState: GroupState = {
  loading: false,
  error: null,
  groups: null,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    getGroups: (state, action: PayloadAction<GroupInterface[]>) => {
      state.groups = action.payload;
    },
    isGroupPending: (state) => {
      (state.loading = true), (state.error = null);
    },
    groupfial: (state, action: PayloadAction<string>) => {
      (state.error = action.payload), (state.loading = false);
    },
  },
});

export const { groupfial, isGroupPending, getGroups } = groupSlice.actions;

export default groupSlice.reducer;
