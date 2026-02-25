import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useFetchCustomerActivitiesService,
  useFetchCustomerAnalyticsService,
  useSuspendCustomerService,
} from "@/services/users.service";
import { X } from "lucide-react";
import { useState } from "react";
import { AccountTab } from "./AccountTab";
import { ActivityTab } from "./ActivityTab";
import { DocumentsTab } from "./DocumentsTab";
import SuspendConfirmationModal from "./SuspendConfirmationModal";

interface UserDetailsSidebarProps {
  userId: string;
  onClose: () => void;
  isSuspended: boolean;
  suspensionReason: string;
}

const UserDetailsSidebar = ({
  userId,
  onClose,
  isSuspended,
  suspensionReason,
}: UserDetailsSidebarProps) => {
  const [activeTab, setActiveTab] = useState<
    "account" | "activity" | "documents"
  >("account");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { customer, isCustomerLoading } =
    useFetchCustomerAnalyticsService(userId);

  const { customerActivity, isActivityLoading } =
    useFetchCustomerActivitiesService(userId);

  const { suspendUser, isSuspendLoading } = useSuspendCustomerService(userId);

  const handleSuspendConfirm = (reason?: string) => {
    suspendUser(
      {
        suspend: !isSuspended,
        reason,
      },
      onClose,
    );
    setIsModalOpen(false);
  };

  if (isCustomerLoading || isActivityLoading) {
    return <Card className="min-h-full animate-pulse bg-gray-200" />;
  }

  if (!customer) return null;

  return (
    <Card className="h-full rounded-lg border p-0 pb-4 overflow-y-auto ">
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
            {(["account", "activity", "documents"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "border-b-[1.5px] border-primary text-primary"
                    : "text-[#010813]/80 hover:text-[#010813]"
                }`}
              >
                {tab === "account"
                  ? "Account information"
                  : tab === "activity"
                    ? "Activity"
                    : "Documents"}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          id="userDetailsSidebar"
          className="flex-1 overflow-y-auto px-4 pt-4"
        >
          {activeTab === "account" && <AccountTab customer={customer} />}
          {activeTab === "activity" && (
            <ActivityTab customerActivity={customerActivity!} />
          )}
          {activeTab === "documents" && (
            <DocumentsTab userId={customer.user.id} />
          )}
        </div>

        <div className="px-4">
          <Button
            variant={isSuspended ? "default" : "destructive"}
            className="mt-4 w-full"
            onClick={() => setIsModalOpen(true)}
          >
            {isSuspended ? "Unsuspend" : "Suspend"}
          </Button>
        </div>
      </CardContent>

      <SuspendConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSuspendConfirm}
        isLoading={isSuspendLoading}
        isSuspending={!isSuspended}
      />
    </Card>
  );
};

export default UserDetailsSidebar;
