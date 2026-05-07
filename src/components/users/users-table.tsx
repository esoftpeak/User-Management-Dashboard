"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowDownAZIcon,
  ArrowUpAZIcon,
  ArrowUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SortAscIcon,
  SortDescIcon,
} from "lucide-react";

import type { User } from "@/types/user";
import { getUserFullName, getUserRoleLabel } from "@/types/user";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsersEmptyState } from "@/components/users/users-empty-state";

type SortKey = "name" | "age";
type SortDir = "asc" | "desc";

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

function genderBadgeVariant(gender?: string) {
  const g = (gender ?? "").toLowerCase();
  if (g === "male") return "secondary";
  if (g === "female") return "default";
  return "outline";
}

export function UsersTable({ users }: { users: User[] }) {
  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebouncedValue(query, 250);

  const [sortKey, setSortKey] = React.useState<SortKey>("name");
  const [sortDir, setSortDir] = React.useState<SortDir>("asc");

  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  const filtered = React.useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => {
      const name = getUserFullName(u).toLowerCase();
      return name.includes(q) || (u.email ?? "").toLowerCase().includes(q);
    });
  }, [debouncedQuery, users]);

  const sorted = React.useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortKey === "age") return dir * ((a.age ?? 0) - (b.age ?? 0));
      const an = getUserFullName(a).toLowerCase();
      const bn = getUserFullName(b).toLowerCase();
      return dir * an.localeCompare(bn);
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);

  React.useEffect(() => {
    if (page !== safePage) setPage(safePage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safePage]);

  const paged = React.useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [safePage, sorted]);

  const sortLabel =
    sortKey === "name" ? "Name" : sortKey === "age" ? "Age" : "Sort";
  const SortDirIcon = sortDir === "asc" ? SortAscIcon : SortDescIcon;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-base">Users</CardTitle>
          <div className="mt-1 text-sm text-muted-foreground">
            {sorted.length} result{sorted.length === 1 ? "" : "s"}
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name or email..."
            className="sm:w-80"
          />

          <Button
            variant="outline"
            onClick={() => {
              if (sortKey === "name") setSortKey("age");
              else setSortKey("name");
            }}
            className="justify-between gap-2"
          >
            <span className="inline-flex items-center gap-2">
              <ArrowUpDownIcon className="size-4" />
              Sort: {sortLabel}
            </span>
            <span className="sr-only">Toggle sort key</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
            className="gap-2"
          >
            <SortDirIcon className="size-4" />
            <span className="hidden sm:inline">
              {sortDir === "asc" ? "Ascending" : "Descending"}
            </span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {sorted.length === 0 ? (
          <div className="p-4">
            <UsersEmptyState
              onReset={() => {
                setQuery("");
                setSortKey("name");
                setSortDir("asc");
                setPage(1);
              }}
            />
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <div className="max-h-[70dvh] overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 z-10 bg-card/90 backdrop-blur supports-backdrop-filter:bg-card/70">
                    <TableRow>
                      <TableHead className="w-[280px]">
                        <button
                          className="inline-flex items-center gap-1 font-medium"
                          onClick={() => {
                            setSortKey("name");
                            setSortDir((d) =>
                              sortKey === "name" ? (d === "asc" ? "desc" : "asc") : "asc"
                            );
                          }}
                        >
                          Name
                          {sortKey === "name" ? (
                            sortDir === "asc" ? (
                              <ArrowDownAZIcon className="size-4" />
                            ) : (
                              <ArrowUpAZIcon className="size-4" />
                            )
                          ) : null}
                        </button>
                      </TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead className="w-[90px] text-right">
                        <button
                          className="inline-flex items-center justify-end gap-1 font-medium"
                          onClick={() => {
                            setSortKey("age");
                            setSortDir((d) =>
                              sortKey === "age" ? (d === "asc" ? "desc" : "asc") : "asc"
                            );
                          }}
                        >
                          Age
                          {sortKey === "age" ? (
                            <ArrowUpDownIcon className="size-4" />
                          ) : null}
                        </button>
                      </TableHead>
                      <TableHead className="w-[110px]">Gender</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead className="w-[140px]">Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paged.map((u) => {
                      const name = getUserFullName(u);
                      const role = getUserRoleLabel(u);
                      return (
                        <TableRow
                          key={u.id}
                          className="transition-colors hover:bg-muted/50"
                        >
                          <TableCell>
                            <Link
                              href={`/dashboard/users/${u.id}`}
                              className="flex items-center gap-3"
                            >
                              <Avatar className="size-9">
                                <AvatarImage src={u.image} alt={name} />
                                <AvatarFallback>{initials(name)}</AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <div className="truncate font-medium text-foreground">
                                  {name}
                                </div>
                                <div className="truncate text-xs text-muted-foreground">
                                  @{u.username}
                                </div>
                              </div>
                            </Link>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {u.email}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {u.phone}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {u.age}
                          </TableCell>
                          <TableCell>
                            <Badge variant={genderBadgeVariant(u.gender)}>
                              {u.gender}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {u.company?.name ?? "—"}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {u.address?.city ?? "—"}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="truncate">
                              {role}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="grid gap-3 p-4 md:hidden">
              {paged.map((u) => {
                const name = getUserFullName(u);
                const role = getUserRoleLabel(u);
                return (
                  <Link key={u.id} href={`/dashboard/users/${u.id}`}>
                    <Card className="transition-colors hover:bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="size-10">
                            <AvatarImage src={u.image} alt={name} />
                            <AvatarFallback>{initials(name)}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-medium">{name}</div>
                            <div className="truncate text-xs text-muted-foreground">
                              {u.email}
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge variant={genderBadgeVariant(u.gender)}>
                                {u.gender}
                              </Badge>
                              <Badge variant="outline">{role}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                          <div className="rounded-lg bg-muted/40 p-2">
                            <div className="text-muted-foreground">Age</div>
                            <div className="mt-0.5 font-medium tabular-nums">
                              {u.age}
                            </div>
                          </div>
                          <div className="rounded-lg bg-muted/40 p-2">
                            <div className="text-muted-foreground">City</div>
                            <div className="mt-0.5 truncate font-medium">
                              {u.address?.city ?? "—"}
                            </div>
                          </div>
                          <div className="rounded-lg bg-muted/40 p-2">
                            <div className="text-muted-foreground">Company</div>
                            <div className="mt-0.5 truncate font-medium">
                              {u.company?.name ?? "—"}
                            </div>
                          </div>
                          <div className="rounded-lg bg-muted/40 p-2">
                            <div className="text-muted-foreground">Phone</div>
                            <div className="mt-0.5 truncate font-medium">
                              {u.phone}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-2 border-t px-4 py-3">
              <div className="text-xs text-muted-foreground">
                Page <span className="font-medium text-foreground">{safePage}</span>{" "}
                of <span className="font-medium text-foreground">{totalPages}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage <= 1}
                  aria-label="Previous page"
                >
                  <ChevronLeftIcon className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage >= totalPages}
                  aria-label="Next page"
                >
                  <ChevronRightIcon className="size-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

