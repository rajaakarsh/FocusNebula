"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

import { AuthProvider } from "@/components/providers/auth-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          {children}
          <Toaster richColors closeButton position="bottom-right" />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
