"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useFetchCustomersService } from "@/services/users.service";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { allCustomers, isCustomersLoading, error } =
    useFetchCustomersService();

  useEffect(() => {
    if (isCustomersLoading) return;

    if (!allCustomers && error) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [allCustomers, error, isCustomersLoading, router, pathname]);

  if (isCustomersLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center animate-pulse">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
