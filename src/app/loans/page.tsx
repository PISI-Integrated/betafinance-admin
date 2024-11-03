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
import { loanData } from "@/lib/constants";
import TableWithPagination from "@/components/TableWithPagination";
import { useRouter, useSearchParams } from "next/navigation";

const Loan = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "Active";

  const [activeTab, setActiveTab] = useState("Pending");

  const columns = activeTab === "P2P" ? loanData.loanTableHead.p2p : loanData.loanTableHead.betaLoans;
  const data = activeTab === "P2P" ? loanData.loanTableBody.p2p : loanData.loanTableBody.betaLoans;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`?tab=${tab}`);
  };

  useEffect(() => {
    const currentTab = searchParams.get("tab");
    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [searchParams, activeTab]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <Button
          variant={activeTab === "P2P" ? "default" : "outline"}
          className={
            activeTab === "P2P"
              ? "bg-primary-light text-primary"
              : "bg-white text-gray-700"
          }
          onClick={() => handleTabChange(tab)}
        >
          P2P Market Place
        </Button>
        <Button
          variant={activeTab === "Beta" ? "default" : "outline"}
          className={
            activeTab === "Beta"
              ? "bg-primary-light text-primary"
              : "bg-white text-gray-700"
          }
          onClick={() => handleTabChange(tab)}
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
            activeTab === "Pending"
              ? "rounded-none border-b-2 border-primary text-primary"
              : "text-black"
          }`}
          onClick={() => setActiveTab("Pending")}
        >
          Pending
        </Button>
        <Button
          variant="ghost"
          className={`px-4 py-2 ${
            activeTab === "Completed"
              ? "rounded-none border-b-2 border-primary text-primary"
              : "text-black"
          }`}
          onClick={() => setActiveTab("Completed")}
        >
          Completed
        </Button>
      </div>

      <TableWithPagination columns={columns} data={data} />
    </div>
  );
};

export default Loan;
