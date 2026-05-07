"use client";

import Link from "next/link";
import { AlertTriangleIcon, RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ApiErrorState({
  title = "Couldn’t load data",
  description = "The API request failed. This can happen due to network/VPN restrictions. Please try again.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Card className="grid place-items-center p-10 text-center">
      <div className="flex max-w-md flex-col items-center gap-3">
        <div className="grid size-12 place-items-center rounded-2xl bg-muted">
          <AlertTriangleIcon className="size-5" />
        </div>
        <div className="text-base font-semibold">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/dashboard/users">
              <RotateCcwIcon className="size-4" />
              Retry
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

