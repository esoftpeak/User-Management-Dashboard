"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { ModeToggle } from "@/components/dashboard/mode-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AppSidebar } from "@/components/dashboard/app-sidebar";

export function AppHeader({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              aria-label="Open navigation"
            >
              <MenuIcon className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <AppSidebar className="border-r-0" />
          </SheetContent>
        </Sheet>

        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">
              {title ?? "Dashboard"}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              Modern admin UX with shadcn/ui
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href="/dashboard/users">Users</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

