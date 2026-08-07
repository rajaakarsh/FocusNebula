"use client";

import { ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { workspaces } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function WorkspaceSwitcher() {
  const [active, setActive] = useState(workspaces[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "hidden h-9 items-center gap-2 rounded-xl border border-border bg-surface px-3 text-sm transition-colors hover:bg-muted lg:flex",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-label="Switch workspace"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/15 text-xs font-semibold text-primary">
            {active.avatar}
          </span>
          <span className="max-w-[120px] truncate font-medium">{active.name}</span>
          <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onClick={() => setActive(workspace)}
            className="gap-3"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-xs font-semibold">
              {workspace.avatar}
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium">{workspace.name}</p>
              <p className="text-xs text-muted-foreground">{workspace.plan} plan</p>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-primary">
          <Plus className="h-4 w-4" />
          Create workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
