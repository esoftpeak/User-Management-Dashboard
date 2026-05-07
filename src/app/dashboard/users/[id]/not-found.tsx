import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User not found</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">
          The user you’re looking for doesn’t exist or couldn’t be loaded.
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard/users">Back to users</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

