"use client";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setIsMobileOpen as setIsMobileOpenAction } from '@/store/slices/sidebarSlice';

export function useSidebar() {
  const dispatch = useDispatch();
  const isMobileOpen = useSelector((state: RootState) => state.sidebar.isMobileOpen);
  
  return {
    isMobileOpen,
    setIsMobileOpen: (isOpen: boolean) => dispatch(setIsMobileOpenAction(isOpen)),
  };
}
