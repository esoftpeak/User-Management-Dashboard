import type { Metadata } from "next";

import { getAllUsers } from "@/services/users";
import { ApiErrorState } from "@/components/users/api-error-state";
import { UsersTable } from "@/components/users/users-table";

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsersPage() {
  const data = await getAllUsers({ batchSize: 100 }).catch(() => null);
  if (!data) {
    return <ApiErrorState />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">Users</h1>
        <p className="text-sm text-muted-foreground">
          Search, sort, and drill into a user profile.
        </p>
      </div>

      <UsersTable users={data.users ?? []} />
    </div>
  );
}

