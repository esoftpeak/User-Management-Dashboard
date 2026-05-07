"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { CheckIcon, MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ThemeMode = "light" | "dark" | "system";

const modes: Array<{ id: ThemeMode; label: string; icon: React.ReactNode }> = [
  { id: "light", label: "Light", icon: <SunIcon className="size-4" /> },
  { id: "dark", label: "Dark", icon: <MoonIcon className="size-4" /> },
  { id: "system", label: "System", icon: <span className="text-xs">OS</span> },
];

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const current = (theme ?? "system") as ThemeMode;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Toggle theme">
          <SunIcon className="size-4 dark:hidden" />
          <MoonIcon className="hidden size-4 dark:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {modes.map((m) => (
          <DropdownMenuItem
            key={m.id}
            onClick={() => setTheme(m.id)}
            className="gap-2"
          >
            {m.icon}
            <span className="flex-1">{m.label}</span>
            {current === m.id ? <CheckIcon className="size-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

