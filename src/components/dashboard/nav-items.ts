import { LayoutDashboardIcon, UsersIcon } from "lucide-react";

export const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    href: "/dashboard/users",
    label: "Users",
    icon: UsersIcon,
  },
] as const;

