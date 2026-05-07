"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UserDetailSection({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; value?: string | number | null }>;
}) {
  const visible = items.filter(
    (i) => i.value !== undefined && i.value !== null && String(i.value).trim()
  );

  if (visible.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {visible.map((i) => (
          <div key={i.label} className="rounded-lg bg-muted/30 p-3">
            <div className="text-xs text-muted-foreground">{i.label}</div>
            <div className="mt-1 truncate text-sm font-medium text-foreground">
              {String(i.value)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

