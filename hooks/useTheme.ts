"use client";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleTheme as toggleThemeAction } from '@/store/slices/themeSlice';

export function useTheme() {
  const dispatch = useDispatch();
  const themeState = useSelector((state: RootState) => state.theme);
  
  return {
    theme: themeState.theme,
    isDark: themeState.isDark,
    toggleTheme: () => dispatch(toggleThemeAction()),
  };
}
