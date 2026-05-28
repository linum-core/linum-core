import { createNavigation } from "next-intl/navigation";
import { routing } from "@/src/libs/i18n/routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
