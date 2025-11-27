"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white shadow-m py-3 px-4 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold">
        OYO
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/search">
          <Button variant={pathname === "/search" ? "default" : "outline"}>
            Search
          </Button>
        </Link>

        <Link href="/login" className="font-bold">
          Login / Signup
          {/* <Button variant={pathname === "/login" ? "default" : "outline"}>
            Login / Signup
          </Button> */}
        </Link>
      </div>
    </nav>
  );
}
