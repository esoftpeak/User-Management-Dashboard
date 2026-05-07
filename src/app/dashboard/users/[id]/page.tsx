import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, MailIcon, PhoneIcon } from "lucide-react";

import { getUserById } from "@/services/users";
import { getUserFullName, getUserRoleLabel } from "@/types/user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserDetailSection } from "@/components/users/user-detail-section";

export const metadata: Metadata = {
  title: "User details",
};

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) notFound();

  const user = await getUserById(numericId).catch(() => null);
  if (!user) notFound();

  const name = getUserFullName(user);
  const role = getUserRoleLabel(user);

  const addressLine = user.address
    ? [user.address.address, user.address.city, user.address.state, user.address.postalCode]
        .filter(Boolean)
        .join(", ")
    : undefined;

  const companyAddressLine = user.company?.address
    ? [
        user.company.address.address,
        user.company.address.city,
        user.company.address.state,
        user.company.address.postalCode,
      ]
        .filter(Boolean)
        .join(", ")
    : undefined;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <Button asChild variant="outline" size="icon" aria-label="Back">
            <Link href="/dashboard/users">
              <ArrowLeftIcon className="size-4" />
            </Link>
          </Button>

          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold tracking-tight">
              {name}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline">{role}</Badge>
              <span className="hidden sm:inline">•</span>
              <span className="tabular-nums">Age {user.age}</span>
              <span className="hidden sm:inline">•</span>
              <span className="capitalize">{user.gender}</span>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <Button asChild variant="outline" className="gap-2">
            <a href={`mailto:${user.email}`}>
              <MailIcon className="size-4" />
              Email
            </a>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <a href={`tel:${user.phone}`}>
              <PhoneIcon className="size-4" />
              Call
            </a>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-14">
              <AvatarImage src={user.image} alt={name} />
              <AvatarFallback>{initials(name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="truncate font-medium">{name}</div>
              <div className="truncate text-sm text-muted-foreground">
                @{user.username}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MailIcon className="size-3.5" /> {user.email}
                </span>
                <span className="inline-flex items-center gap-1">
                  <PhoneIcon className="size-3.5" /> {user.phone}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <UserDetailSection
          title="Personal"
          items={[
            { label: "First name", value: user.firstName },
            { label: "Last name", value: user.lastName },
            { label: "Maiden name", value: user.maidenName },
            { label: "Birth date", value: user.birthDate },
            { label: "Blood group", value: user.bloodGroup },
            { label: "Eye color", value: user.eyeColor },
            { label: "Hair", value: user.hair ? `${user.hair.color ?? ""} ${user.hair.type ?? ""}`.trim() : undefined },
            { label: "University", value: user.university },
          ]}
        />

        <UserDetailSection
          title="Address"
          items={[
            { label: "Street", value: user.address?.address },
            { label: "City", value: user.address?.city },
            { label: "State", value: user.address?.state },
            { label: "Postal code", value: user.address?.postalCode },
            { label: "Country", value: user.address?.country },
            { label: "Full", value: addressLine },
          ]}
        />

        <UserDetailSection
          title="Company"
          items={[
            { label: "Name", value: user.company?.name },
            { label: "Department", value: user.company?.department },
            { label: "Title", value: user.company?.title },
            { label: "Office address", value: companyAddressLine },
          ]}
        />

        <UserDetailSection
          title="Bank"
          items={[
            { label: "Card type", value: user.bank?.cardType },
            { label: "Card number", value: user.bank?.cardNumber },
            { label: "Expires", value: user.bank?.cardExpire },
            { label: "Currency", value: user.bank?.currency },
            { label: "IBAN", value: user.bank?.iban },
          ]}
        />

        <UserDetailSection
          title="Crypto"
          items={[
            { label: "Coin", value: user.crypto?.coin },
            { label: "Wallet", value: user.crypto?.wallet },
            { label: "Network", value: user.crypto?.network },
          ]}
        />
      </div>
    </div>
  );
}

