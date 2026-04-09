import TransactionsContent from "@/components/transactions/TransactionsContent";
import React, { Suspense } from "react";

const TransactionsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransactionsContent />
    </Suspense>
  );
};

export default TransactionsPage;

