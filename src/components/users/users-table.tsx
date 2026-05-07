"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowDownAZIcon,
  ArrowUpAZIcon,
  ArrowUpDownIcon,
  ChevronDownIcon,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const [pageSize, setPageSize] = React.useState(10);

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

  const rangeStart = sorted.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const rangeEnd = Math.min(sorted.length, safePage * pageSize);

  const pageNumbers = React.useMemo(() => {
    const pages: Array<number | "ellipsis"> = [];
    const add = (n: number | "ellipsis") => pages.push(n);
    const total = totalPages;
    const cur = safePage;
    if (total <= 7) {
      for (let i = 1; i <= total; i++) add(i);
      return pages;
    }
    add(1);
    if (cur > 4) add("ellipsis");
    const start = Math.max(2, cur - 1);
    const end = Math.min(total - 1, cur + 1);
    for (let i = start; i <= end; i++) add(i);
    if (cur < total - 3) add("ellipsis");
    add(total);
    return pages;
  }, [safePage, totalPages]);

  const sortLabel =
    sortKey === "name" ? "Name" : sortKey === "age" ? "Age" : "Sort";
  const SortDirIcon = sortDir === "asc" ? SortAscIcon : SortDescIcon;

  return (
    <Card className="overflow-hidden shadow-sm">
      <CardHeader className="flex flex-col gap-3 border-b bg-card/40 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-base tracking-tight">Users</CardTitle>
          <div className="mt-1 text-sm text-muted-foreground">
            {sorted.length} result{sorted.length === 1 ? "" : "s"}{" "}
            {sorted.length ? (
              <span className="text-muted-foreground/70">
                • Showing {rangeStart}-{rangeEnd}
              </span>
            ) : null}
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
            className="h-9 sm:w-80"
          />

          <Button
            variant="outline"
            onClick={() => {
              if (sortKey === "name") setSortKey("age");
              else setSortKey("name");
            }}
            className="h-9 justify-between gap-2"
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
            className="h-9 gap-2"
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
              <div className="w-full">
                <Table className="w-full">
                  <TableHeader className="bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/80">
                    <TableRow>
                      <TableHead className="w-[320px]">
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
                      <TableHead className="w-[340px]">Email</TableHead>
                      <TableHead className="w-[200px]">Phone</TableHead>
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
                      <TableHead className="w-[260px]">Company</TableHead>
                      <TableHead className="w-[200px]">City</TableHead>
                      <TableHead className="w-[240px]">Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paged.map((u) => {
                      const name = getUserFullName(u);
                      const role = getUserRoleLabel(u);
                      return (
                        <TableRow
                          key={u.id}
                          className="transition-colors duration-200 hover:bg-muted/40"
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
                            <span className="block truncate">{u.email}</span>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            <span className="block truncate">{u.phone}</span>
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
                            <span className="block truncate">
                              {u.company?.name ?? "—"}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            <span className="block truncate">
                              {u.address?.city ?? "—"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="max-w-full truncate">
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

            <div className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  {rangeStart}-{rangeEnd}
                </span>{" "}
                of <span className="font-medium text-foreground">{sorted.length}</span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-8 gap-2">
                      <span className="tabular-nums">{pageSize}</span>/page
                      <ChevronDownIcon className="size-4 opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {[10, 20, 50].map((n) => (
                      <DropdownMenuItem
                        key={n}
                        onClick={() => {
                          setPageSize(n);
                          setPage(1);
                        }}
                      >
                        {n} / page
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage(1)}
                  disabled={safePage <= 1}
                  aria-label="First page"
                >
                  <span className="text-xs">«</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage <= 1}
                  aria-label="Previous page"
                >
                  <ChevronLeftIcon className="size-4" />
                </Button>

                <div className="hidden items-center gap-1 sm:flex">
                  {pageNumbers.map((p, idx) =>
                    p === "ellipsis" ? (
                      <div
                        key={`e-${idx}`}
                        className="px-2 text-xs text-muted-foreground"
                      >
                        …
                      </div>
                    ) : (
                      <Button
                        key={p}
                        variant={p === safePage ? "default" : "outline"}
                        size="icon"
                        className={cn("h-8 w-8", p === safePage && "pointer-events-none")}
                        onClick={() => setPage(p)}
                        aria-label={`Page ${p}`}
                      >
                        <span className="text-xs tabular-nums">{p}</span>
                      </Button>
                    )
                  )}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage >= totalPages}
                  aria-label="Next page"
                >
                  <ChevronRightIcon className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage(totalPages)}
                  disabled={safePage >= totalPages}
                  aria-label="Last page"
                >
                  <span className="text-xs">»</span>
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

