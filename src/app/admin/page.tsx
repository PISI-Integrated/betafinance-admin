'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import TableWithPagination from '../../components/TableWithPagination';
import UserDetailsSidebar from '../../components/UserDetailSideBar';
import { adminData, AdminStatus } from '@/lib/constants';
import { AdminRow, Column } from '@/types/types';
import { useRouter, useSearchParams } from 'next/navigation';

const Admin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status") || AdminStatus.ACTIVE;

  const [activeStatus, setActiveStatus] = useState(initialStatus);
  const [selectedUser, setSelectedUser] = useState<AdminRow | null>(null);

  const columns = adminData.adminTableHead as Column<AdminRow>[];
  const data = adminData.adminTableBody.filter(user => user.status === activeStatus);

  const handleRowClick = (user: AdminRow) => {
    setSelectedUser(user);
  };

  const handleCloseSidebar = () => {
    setSelectedUser(null);
  };

  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
    router.push(`?status=${status}`);
  };

  useEffect(() => {
    const currentStatus = searchParams.get("status");
    if (currentStatus && currentStatus !== activeStatus) {
      setActiveStatus(currentStatus);
    }
  }, [searchParams, activeStatus]);



  return (
    <div className="flex flex-col gap-6">
        <div className="flex gap-4 border-b border-gray-700">
          {[AdminStatus.ACTIVE, AdminStatus.SUSPENDED].map((status) => (
            <Button
              key={status}
              variant="ghost"
              className={`px-4 py-2 capitalize ${activeStatus === status ? "rounded-none border-b-[1px] border-primary text-primary" : "text-gray-700"}`}
              onClick={() => handleStatusChange(status)}
            >
              {status}
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

export default Admin;
