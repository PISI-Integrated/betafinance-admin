import React, { Suspense } from "react";
import LoansContent from "@/components/loans/LoansContent";
import { Card, CardContent } from "@/components/ui/card";

function LoansSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-gray-200 h-10 bg-gray-100 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="rounded-lg border-gray-200">
            <CardContent className="pt-6 h-24 bg-gray-100 animate-pulse" />
          </Card>
        ))}
      </div>
      <div className="flex gap-2 border-b border-gray-200 h-10 bg-gray-100 animate-pulse" />
      <Card className="rounded-lg border-gray-200 overflow-hidden">
        <CardContent className="pt-6 h-64 bg-gray-100 animate-pulse" />
      </Card>
    </div>
  );
}

export default function Loans() {
  return (
    <Suspense fallback={<LoansSkeleton />}>
      <LoansContent />
    </Suspense>
  );
}
