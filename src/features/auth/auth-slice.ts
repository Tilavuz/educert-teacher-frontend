import { apiClient } from "@/api/api-client";
import { actionToken } from "@/helpers/action-token";
import { TeacherInterface } from "@/interfaces/teacher-interface";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface UserSate {
  loading: boolean;
  error: string | null;
  user: TeacherInterface | null;
  isLogin: boolean;
  status: string | null;
}

const initialState: UserSate = {
  loading: false,
  error: null,
  user: null,
  isLogin: false,
  status: null,
};

export const getUser = createAsyncThunk("user/getUser", async (_, thunkApi) => {
  try {
    const res = await apiClient.get("/auth/user");
    return res.data;
  } catch (error) {
    const result = error as Error;
    return thunkApi.rejectWithValue(result.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth: (state, action: PayloadAction<TeacherInterface>) => {
      (state.isLogin = true),
        (state.loading = false),
        (state.user = action.payload),
        (state.error = null);
    },
    changeUserData: (state, action: PayloadAction<TeacherInterface>) => {
      (state.loading = false), (state.user = action.payload);
    },
    logout: (state) => {
      (state.loading = false), (state.error = null), actionToken.setToken("token", ''), (state.user = null);
    },
    authStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    authFail: (state, action: PayloadAction<string>) => {
      (state.error = action.payload), (state.loading = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<TeacherInterface>) => {
          (state.user = action.payload), (state.status = "successful");
        }
      )
      .addCase(getUser.rejected, (state, action) => {
        (state.status = "failed"),
          (state.error = action.error.message || "Failed to fetch user");
      });
  },
});

export const { auth, logout, authFail, authStart, changeUserData } =
  authSlice.actions;

export default authSlice.reducer;
