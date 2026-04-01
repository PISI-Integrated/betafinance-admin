import { useFetchRolesService } from "@/services/admin.service";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Shield, UserCog, Calendar } from "lucide-react";
import { useState, ReactNode, useEffect } from "react";
import RoleDetailsSidebar from "./RoleDetailsSidebar";
import TableWithPagination from "@/components/TableWithPagination";
import { Column } from "@/types/types";
import { formatDate } from "@/lib/utils";
import { CreateRoleModal } from "./CreateRoleModal";
import toast from "react-hot-toast";

interface RoleTableRow {
  id: string;
  name: ReactNode;
  description: ReactNode;
  date: ReactNode;
  _raw: IRolesResponse;
}

interface RoleManagementProps {
  isCreateModalOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const RoleManagement = ({
  isCreateModalOpen,
  onOpenChange,
}: RoleManagementProps) => {
  const { roles, rolesLoading, rolesError } = useFetchRolesService();
  const [selectedRole, setSelectedRole] = useState<IRolesResponse | null>(null);

  const handleEditRole = (role: IRolesResponse) => {
    setSelectedRole(role);
    onOpenChange(true);
  };

  const handleRowClick = (row: RoleTableRow) => {
    setSelectedRole(row._raw);
  };

  const handleCloseSidebar = () => {
    setSelectedRole(null);
  };

  const columns: Column<RoleTableRow>[] = [
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { header: "Date Created", accessor: "date" },
  ];

  const tableData: RoleTableRow[] = (roles || []).map((role) => ({
    id: role.id,
    name: (
      <div className="flex items-center gap-3">
        <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
          <Shield className="h-4 w-4" />
        </div>
        <span className="font-bold capitalize text-gray-900 tracking-tight">
          {role.name}
        </span>
      </div>
    ),
    description: role.description || "No description provided",
    date: (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-orange-400" />
        <span className="tracking-tight">
          {formatDate(role.created_at, true)}
        </span>
      </div>
    ),
    _raw: role,
  }));

  useEffect(() => {
    if (rolesError) {
      toast.error(rolesError?.response.data.detail || "Something went wrong");
    }
  }, [rolesError]);

  if (rolesLoading) {
    return (
      <Card className="overflow-hidden border-none bg-white/80 backdrop-blur-sm ring-1 ring-gray-200/50">
        <CardContent className="p-8 space-y-4">
          <Skeleton className="h-10 w-48 rounded" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-2 duration-400">
      <div className={selectedRole ? "lg:col-span-3" : "lg:col-span-4"}>
        <Card className="overflow-hidden rounded-2xl border-none bg-white/80 backdrop-blur-sm ring-1 ring-gray-200/50">
          <CardContent className="p-0">
            {!rolesError && tableData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 gap-4">
                <div className="bg-gray-100 p-6 rounded-full shadow-inner animate-pulse">
                  <UserCog className="h-12 w-12 text-gray-300" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-gray-900 font-bold text-lg tracking-tight">
                    No Roles Configured
                  </p>
                  <p className="text-gray-400 text-sm max-w-[280px]">
                    Begin by creating a new system role to manage admin access.
                  </p>
                </div>
                <Button
                  onClick={() => onOpenChange(true)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 h-12 transition-all active:scale-[0.98]"
                >
                  Create Your First Role
                </Button>
              </div>
            ) : (
              <TableWithPagination
                columns={columns}
                data={tableData}
                onRowClick={handleRowClick}
                currentPage={1}
                totalPages={1}
                itemsPerPage={tableData.length}
                onPageChange={() => {}}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {selectedRole && (
        <div className="lg:col-span-1 animate-in slide-in-from-right-4 duration-300">
          <RoleDetailsSidebar
            role={selectedRole}
            onClose={handleCloseSidebar}
            onEdit={handleEditRole}
          />
        </div>
      )}

      <CreateRoleModal
        open={isCreateModalOpen}
        onOpenChange={(open: boolean) => {
          onOpenChange(open);
          if (!open) setSelectedRole(null);
        }}
        selectedRole={selectedRole}
      />
    </div>
  );
};

export default RoleManagement;
