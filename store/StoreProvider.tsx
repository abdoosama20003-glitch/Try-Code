"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState } from './index';
import { initTheme } from './slices/themeSlice';

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("at-theme") as Theme | null;
  return saved === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") {
    root.classList.add("light");
    root.classList.remove("dark");
  } else {
    root.classList.remove("light");
    root.classList.add("dark");
  }
}

if (typeof window !== "undefined") {
  applyTheme(getInitialTheme());
}

function ThemeSync({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    dispatch(initTheme());
    setMounted(true);
  }, [dispatch]);

  useEffect(() => {
    if (mounted) {
      applyTheme(theme);
      localStorage.setItem("at-theme", theme);
    }
  }, [theme, mounted]);

  return <>{children}</>;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeSync>
        {children}
      </ThemeSync>
    </Provider>
  );
}
