"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { loanData, LoanStatus, LoanTabs } from "@/lib/constants";
import TableWithPagination from "@/components/TableWithPagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Column, LoanBetaRow, LoanP2PRow } from "@/types/types";

const Loan = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTab = searchParams.get("tab") || LoanTabs.P2P;
  const initialStatus = searchParams.get("status") || LoanStatus.PENDING;

  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeStatus, setActiveStatus] = useState(initialStatus);

  const columns =
    activeTab === LoanTabs.P2P
      ? (loanData.loanTableHead.p2p as Column<LoanP2PRow>[])
      : (loanData.loanTableHead.betaLoans as Column<LoanBetaRow>[]);

  const data =
    activeTab === LoanTabs.P2P
      ? loanData.loanTableBody.p2p
      : loanData.loanTableBody.betaLoans;

  const updateUrl = (tab: string, status: string) => {
    router.push(`?tab=${tab}&status=${status}`);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    updateUrl(tab, activeStatus);
  };

  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
    updateUrl(activeTab, status);
  };

  useEffect(() => {
    const currentTab = searchParams.get("tab");
    const currentStatus = searchParams.get("status");

    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
    if (currentStatus && currentStatus !== activeStatus) {
      setActiveTab(currentStatus);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <Button
          variant={activeTab === LoanTabs.P2P ? "default" : "outline"}
          className={
            activeTab === LoanTabs.P2P
              ? "bg-primary-light text-primary"
              : "bg-white text-gray-700"
          }
          onClick={() => handleTabChange(LoanTabs.P2P)}
        >
          P2P Market Place
        </Button>
        <Button
          variant={activeTab === LoanTabs.BETA_LOANS ? "default" : "outline"}
          className={
            activeTab === LoanTabs.BETA_LOANS
              ? "bg-primary-light text-primary"
              : "bg-white text-gray-700"
          }
          onClick={() => handleTabChange(LoanTabs.BETA_LOANS)}
        >
          Beta Loans
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {loanData.loanHead.map((item, index) => (
          <Card key={index} className="col-span-1 rounded-lg">
            <CardHeader>
              <CardDescription>{item.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{item.content}</p>
            </CardContent>
            <CardFooter>
              <p>{item.footer}</p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button
          variant="ghost"
          className={`px-4 py-2 ${
            activeStatus === LoanStatus.PENDING
              ? "rounded-none border-b-2 border-primary text-primary"
              : "text-black"
          }`}
          onClick={() => handleStatusChange(LoanStatus.PENDING)}
        >
          Pending
        </Button>
        <Button
          variant="ghost"
          className={`px-4 py-2 ${
            activeStatus === LoanStatus.COMPLETED
              ? "rounded-none border-b-2 border-primary text-primary"
              : "text-black"
          }`}
          onClick={() => handleStatusChange(LoanStatus.COMPLETED)}
        >
          Completed
        </Button>
      </div>

      <TableWithPagination columns={columns} data={data} />
    </div>
  );
};

export default Loan;
