"use client";

import { Flex, Box } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen bg-background overflow-hidden font-sans">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-auto min-w-0 bg-background relative">
        {children}
      </div>
    </div>
  );
}