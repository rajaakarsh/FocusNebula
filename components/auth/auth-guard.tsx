"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // Show a sleek loading state while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
        <div className="relative flex items-center justify-center">
          {/* Orbital loading animation */}
          <div className="absolute h-24 w-24 animate-[spin_3s_linear_infinite] rounded-full border-t-2 border-primary border-opacity-50" />
          <div className="absolute h-16 w-16 animate-[spin_2s_linear_infinite_reverse] rounded-full border-r-2 border-accent border-opacity-70" />
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <p className="mt-6 text-sm font-medium tracking-widest text-muted-foreground uppercase opacity-70">
          Initializing Session
        </p>
      </div>
    );
  }

  // If we are not loading and there is no user, return nothing (redirect will happen)
  if (!user) {
    return null;
  }

  // Authenticated! Render the protected content.
  return <>{children}</>;
}
