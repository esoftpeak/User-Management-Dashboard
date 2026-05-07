"use client";

import Link from "next/link";
import { SearchXIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function UsersEmptyState({
  title = "No users found",
  description = "Try adjusting your search or filters.",
  onReset,
}: {
  title?: string;
  description?: string;
  onReset?: () => void;
}) {
  return (
    <Card className="grid place-items-center p-10 text-center">
      <div className="flex max-w-md flex-col items-center gap-3">
        <div className="grid size-12 place-items-center rounded-2xl bg-muted">
          <SearchXIcon className="size-5" />
        </div>
        <div className="text-base font-semibold">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {onReset ? (
            <Button variant="outline" onClick={onReset}>
              Reset
            </Button>
          ) : null}
          <Button asChild>
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

