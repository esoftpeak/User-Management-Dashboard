"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { navItems } from "@/components/dashboard/nav-items";

export function AppSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-full flex-col gap-6 border-r bg-sidebar px-3 py-4 text-sidebar-foreground",
        className
      )}
    >
      <div className="px-2">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="grid size-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
            <span className="text-sm font-semibold">UM</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">User Management</div>
            <div className="text-xs text-muted-foreground">Admin Dashboard</div>
          </div>
        </Link>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive &&
                  "bg-sidebar-accent text-sidebar-accent-foreground ring-1 ring-sidebar-border"
              )}
            >
              <Icon className="size-4" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-2 text-xs text-muted-foreground">
        Data: DummyJSON users API
      </div>
    </aside>
  );
}

