"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useFetchAdminProfileService } from "@/services/admin.service";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { adminProfile, adminProfileLoading, adminProfileError } =
    useFetchAdminProfileService();

  useEffect(() => {
    if (adminProfileLoading && !adminProfile) return;

    if (adminProfileError) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [adminProfileError, adminProfileLoading, adminProfile, router, pathname]);

  if (adminProfileLoading && !adminProfile) {
    return (
      <div className="w-full h-screen flex justify-center items-center animate-pulse">
        Loading...
      </div>
    );
  }

  if (adminProfileLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center animate-pulse">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
