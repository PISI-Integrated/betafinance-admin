"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import TableWithPagination from "../../components/TableWithPagination";
import { customerData } from "@/lib/constants";
import UserDetailsSidebar from "../../components/UserDetailSideBar";
import { useRouter, useSearchParams } from "next/navigation";
import { CustomerData, CustomerRow } from "@/types/types";

const Customers = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "Active";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedUser, setSelectedUser] = useState<
    CustomerData['customerTableBody']['p2p'][number] |
    CustomerData['customerTableBody']['p2p'][number] | 
    null
    >(null);

  const columns = activeTab === "P2P" ? customerData.customerTableHead.p2p : customerData.customerTableHead.betaLoans;
  const data = activeTab === "P2P" ? customerData.customerTableBody.p2p : customerData.customerTableBody.betaLoans;

  const handleRowClick = (user: typeof data[number]) => {
    setSelectedUser(user);
  };

  const handleCloseSidebar = () => {
    setSelectedUser(null);
  };

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
      <div className="flex gap-4 border-b border-gray-700">
        {["Active", "Suspended"].map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            className={`px-4 py-2 ${activeTab === tab ? "rounded-none border-b-[1px] border-primary text-primary" : "text-gray-700"}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>
     
      <div className="grid grid-cols-3 gap-4">
        <div className={`${selectedUser ? "col-span-2" : "col-span-3"} overflow-x-auto`}>
          <TableWithPagination
            columns={columns}
            data={data}
            onRowClick={handleRowClick}
          />
        </div>

        {selectedUser && (
          <div className="col-span-1">
            <UserDetailsSidebar user={selectedUser} onClose={handleCloseSidebar} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
