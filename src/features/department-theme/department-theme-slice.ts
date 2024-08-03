import { ThemeInterface } from "@/interfaces/theme-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DepartmentThemeState {
  themes: { themes: ThemeInterface[]; id: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: DepartmentThemeState = {
  themes: null,
  loading: false,
  error: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    getThemes: (
      state,
      action: PayloadAction<{ themes: ThemeInterface[]; id: string }>
    ) => {
      if (state.themes) {
        state.themes.themes = [
          ...state.themes.themes,
          ...action.payload.themes,
        ];
        state.themes.id = action.payload.id;
      } else {
        state.themes = {
          themes: action.payload.themes,
          id: action.payload.id,
        };
      }
    },
    isThemePending: (state) => {
      state.loading = true;
      state.error = null;
    },
    themeFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { isThemePending, themeFail, getThemes } = themeSlice.actions;

export default themeSlice.reducer;
