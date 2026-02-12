import { Suspense } from "react";
import AdminContent from "@/components/admin/AdminContent";
import { Card, CardContent } from "@/components/ui/card";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Betafinance",
  description: "Admin Management",
};

function AdminSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-gray-200 h-10 bg-gray-100 animate-pulse" />
      <Card className="rounded-lg border-gray-200 overflow-hidden">
        <CardContent className="pt-6 h-64 bg-gray-100 animate-pulse" />
      </Card>
    </div>
  );
}

export default function Admin() {
  return (
    <Suspense fallback={<AdminSkeleton />}>
      <AdminContent />
    </Suspense>
  );
}
