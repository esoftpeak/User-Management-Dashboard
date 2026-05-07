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
        "flex h-full w-full flex-col gap-6 bg-card px-4 py-4 text-foreground",
        className
      )}
    >
      <div className="px-1">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <span className="text-sm font-semibold tracking-tight">UM</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">
              User Management
            </div>
            <div className="text-xs text-muted-foreground">Admin Dashboard</div>
          </div>
        </Link>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors duration-200 hover:bg-muted/60",
                isActive &&
                  "bg-primary/10 text-foreground shadow-[inset_0_0_0_1px_hsl(var(--border))]"
              )}
            >
              {isActive ? (
                <span className="absolute left-1 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-primary" />
              ) : null}
              <Icon className="size-4" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-1 text-xs text-muted-foreground">
        Data: DummyJSON users API
      </div>
    </aside>
  );
}

