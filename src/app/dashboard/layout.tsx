import type { Metadata } from "next";

import { AppHeader } from "@/components/dashboard/app-header";
import { AppSidebar } from "@/components/dashboard/app-sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto grid min-h-dvh max-w-[1560px] grid-cols-1 md:grid-cols-[280px_1fr]">
        <div className="hidden md:block">
          <div className="sticky top-0 h-dvh p-3">
            <AppSidebar className="h-[calc(100dvh-1.5rem)] rounded-2xl border bg-card shadow-sm" />
          </div>
        </div>

        <div className="flex min-w-0 flex-col">
          <AppHeader />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto w-full max-w-[1400px]">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
