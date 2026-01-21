import React, { Suspense } from "react";
import CustomersContent from "@/components/customers/CustomersContent";
import { Card, CardContent } from "@/components/ui/card";

function CustomersSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-gray-200 h-10 bg-gray-100 animate-pulse" />
      <Card className="rounded-lg border-gray-200 overflow-hidden">
        <CardContent className="pt-6 h-64 bg-gray-100 animate-pulse" />
      </Card>
    </div>
  );
}

export default function Customers() {
  return (
    <Suspense fallback={<CustomersSkeleton />}>
      <CustomersContent />
    </Suspense>
  );
}
