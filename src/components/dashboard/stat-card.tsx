"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  className,
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon ? (
          <div className="grid size-9 place-items-center rounded-xl bg-muted text-foreground">
            {icon}
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="-mt-1">
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        {subtitle ? (
          <div className="mt-1 text-xs text-muted-foreground">{subtitle}</div>
        ) : null}
      </CardContent>
    </Card>
  );
}

