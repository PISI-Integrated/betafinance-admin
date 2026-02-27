import { X } from "lucide-react";
import { AdminRow } from "@/types/types";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface AdminDetailsSidebarProps {
  user: Partial<AdminRow> | null;
  onClose: () => void;
}

const AdminDetailsSidebar = ({ user, onClose }: AdminDetailsSidebarProps) => {
  if (!user) return null;

  return (
    <Card className="h-full overflow-hidden rounded-lg border-gray-200 p-0 pb-4">
      <CardContent className="flex h-full flex-col p-0">
        {/* Header */}
        <div className="p-4 pb-2 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#010813] ">
                {user.name}
              </h2>
              <p className=" text-[#A9ACB1] text-xs font-medium">
                {user.email}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-[#A9ACB1] text-xs font-medium" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 mt-4">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex flex-col gap-y-2 text-sm">
                {user.dateJoined && (
                  <div className="flex flex-col gap-y-1 justify-between">
                    <span className="text-[#344054] text-xs">Phone number</span>
                    <span className="font-medium text-[#010813] text-sm">
                      {user.phoneNumber}
                    </span>
                  </div>
                )}

                {user.status && (
                  <div className="flex flex-col gap-y-1 ">
                    <span className="text-[#344054] text-xs">Status</span>
                    <span
                      className={`w-fit text-sm font-medium px-2 py-1 rounded-lg ${
                        user.status === "active"
                          ? "text-[#079455] bg-[#ECFDF5]"
                          : "text-[#AD3307] bg-[#FFECE5]"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                )}

                {user.dateJoined && (
                  <div className="flex flex-col gap-y-1 justify-between">
                    <span className="text-[#344054] text-xs">Date added</span>
                    <span className="font-medium text-[#010813] text-sm">
                      {user.dateJoined}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Suspend Button */}
          <Button variant="destructive" className=" w-full mt-4">
            Suspend
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDetailsSidebar;
