import Link from "next/link";
import { UsersIcon, UserRoundIcon, UserRoundCheckIcon } from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { ApiErrorState } from "@/components/users/api-error-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllUsers } from "@/services/users";

export default async function DashboardPage() {
  const data = await getAllUsers({ batchSize: 100 }).catch(() => null);
  if (!data) {
    return <ApiErrorState />;
  }

  const users = data.users ?? [];

  const total = users.length;
  const male = users.filter((u) => (u.gender ?? "").toLowerCase() === "male")
    .length;
  const female = users.filter((u) => (u.gender ?? "").toLowerCase() === "female")
    .length;
  const avgAge =
    total === 0
      ? 0
      : Math.round(
          users.reduce((acc, u) => acc + (Number(u.age) || 0), 0) / total
        );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          High-level metrics and a quick entry point to user management.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total users"
          value={String(total)}
          subtitle="Fetched from DummyJSON"
          icon={<UsersIcon className="size-4" />}
        />
        <StatCard
          title="Male users"
          value={String(male)}
          subtitle={total ? `${Math.round((male / total) * 100)}%` : "—"}
          icon={<UserRoundIcon className="size-4" />}
        />
        <StatCard
          title="Female users"
          value={String(female)}
          subtitle={total ? `${Math.round((female / total) * 100)}%` : "—"}
          icon={<UserRoundCheckIcon className="size-4" />}
        />
        <StatCard
          title="Average age"
          value={total ? String(avgAge) : "—"}
          subtitle="Across loaded users"
        />
      </section>

      <Card className="shadow-sm">
        <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
          <CardTitle className="text-base tracking-tight">Users</CardTitle>
          <Button asChild variant="outline">
            <Link href="/dashboard/users">Open users</Link>
          </Button>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Search, sort, and paginate users with a responsive table/cards view and
          a detailed profile page.
        </CardContent>
      </Card>
    </div>
  );
}

