"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import TableWithPagination from "@/components/TableWithPagination";
import { customerData, CustomerStatus } from "@/lib/constants";
import UserDetailsSidebar from "@/components/UserDetailSideBar";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

const CustomersContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || CustomerStatus.ACTIVE;

  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const columns =
    activeTab === CustomerStatus.ACTIVE
      ? customerData.customerTableHead.p2p
      : customerData.customerTableHead.betaLoans;

  const data =
    activeTab === CustomerStatus.ACTIVE
      ? customerData.customerTableBody.p2p
      : customerData.customerTableBody.betaLoans;

  const handleRowClick = (user: any) => {
    setSelectedUser(user);
  };

  const handleCloseSidebar = () => {
    setSelectedUser(null);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedUser(null);
    router.push(`/customers?tab=${tab}`);
  };

  useEffect(() => {
    const currentTab = searchParams.get("tab");
    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [searchParams, activeTab]);

  return (
    <div className="space-y-6">
      {/* Status Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          className={`pb-3 text-sm font-medium capitalize transition-colors ${
            activeTab === CustomerStatus.ACTIVE
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => handleTabChange(CustomerStatus.ACTIVE)}
        >
          Active
        </button>
        <button
          className={`pb-3 text-sm font-medium capitalize transition-colors ${
            activeTab === CustomerStatus.SUSPENDED
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => handleTabChange(CustomerStatus.SUSPENDED)}
        >
          Suspended
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className={selectedUser ? "lg:col-span-2" : "lg:col-span-3"}>
          <Card className="overflow-hidden rounded-lg border-gray-200 bg-white">
            <CardContent className="p-0">
              <TableWithPagination
                columns={columns}
                data={data}
                onRowClick={handleRowClick}
              />
            </CardContent>
          </Card>
        </div>

        {selectedUser && (
          <div className="lg:col-span-1">
            <UserDetailsSidebar
              user={selectedUser}
              onClose={handleCloseSidebar}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersContent;
