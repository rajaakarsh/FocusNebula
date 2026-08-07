"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this data. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <Card className="border-destructive/20 bg-destructive/5">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">{message}</p>
        {onRetry && (
          <Button variant="outline" className="mt-6 gap-2" onClick={onRetry}>
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
