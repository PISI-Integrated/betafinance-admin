import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFetchCustomerAnalyticsService } from "@/services/users.service";
import { X } from "lucide-react";
import { useState } from "react";
import { AccountTab } from "./AccountTab";
import { ActivityTab } from "./ActivityTab";

interface UserDetailsSidebarProps {
  userId: string;
  onClose: () => void;
}

const UserDetailsSidebar = ({ userId, onClose }: UserDetailsSidebarProps) => {
  const [activeTab, setActiveTab] = useState<"account" | "activity">("account");

  const { customer, isCustomerLoading } =
    useFetchCustomerAnalyticsService(userId);

  if (isCustomerLoading) {
    return <Card className="min-h-full animate-pulse bg-gray-200" />;
  }

  if (!customer) return null;

  return (
    <Card className="h-full rounded-lg border p-0 pb-4">
      <CardContent className="flex h-full flex-col p-0">
        {/* Header */}
        <div className="p-4 pb-0">
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-semibold capitalize">
                {customer.user.name}
              </h2>
              {customer.user.username && (
                <p className="text-xs text-[#A9ACB1]">
                  @{customer.user.username}
                </p>
              )}
            </div>
            <button onClick={onClose}>
              <X className="h-5 w-5 text-[#A9ACB1]" />
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex gap-4 border-b">
            {(["account", "activity"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium ${
                  activeTab === tab
                    ? "border-b-[1.5px] border-primary text-primary"
                    : "text-[#010813]"
                }`}
              >
                {tab === "account" ? "Account information" : "Activity"}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pt-4">
          {activeTab === "account" ? (
            <AccountTab customer={customer} />
          ) : (
            <ActivityTab />
          )}
        </div>

        <div className="px-4">
          <Button variant="destructive" className="mt-4 w-full">
            Suspend
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDetailsSidebar;
