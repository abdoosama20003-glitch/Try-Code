import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Theme = 'dark' | 'light';

interface ThemeState {
  theme: Theme;
  isDark: boolean;
}

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("at-theme") as Theme | null;
  return saved === "dark" ? "dark" : "light";
};

const initialState: ThemeState = {
  theme: "light",
  isDark: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      state.isDark = action.payload === 'dark';
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      state.isDark = state.theme === 'dark';
    },
    initTheme: (state) => {
      const initial = getInitialTheme();
      state.theme = initial;
      state.isDark = initial === 'dark';
    }
  },
});

export const { setTheme, toggleTheme, initTheme } = themeSlice.actions;
export default themeSlice.reducer;
