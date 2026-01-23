import { useState } from "react";
import { Button } from "./ui/button";
import { X, Copy } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { CustomerRow } from "@/types/types";

interface UserDetailsSidebarProps {
  user: Partial<CustomerRow> | null;
  onClose: () => void;
}

const UserDetailsSidebar: React.FC<UserDetailsSidebarProps> = ({
  user,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"account" | "activity">("account");

  if (!user) return null;

  return (
    <Card className="h-full overflow-hidden rounded-lg border-gray-200 p-0 pb-4">
      <CardContent className="flex h-full flex-col p-0">
        {/* Header */}
        <div className="p-4 pb-0">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#010813] ">
                {user.name}
              </h2>
              <p className=" text-[#A9ACB1] text-xs font-medium">
                {user.username}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-[#A9ACB1] text-xs font-medium" />
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex gap-4 border-b">
            <button
              onClick={() => setActiveTab("account")}
              className={`text-sm font-medium transition-colors ${
                activeTab === "account"
                  ? "border-b-[1.5px] border-primary text-primary"
                  : "text-[#010813] hover:text-[#010813] text-sm"
              }`}
            >
              Account information
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`text-sm font-medium transition-colors ${
                activeTab === "activity"
                  ? "border-b-[1.5px] border-primary text-primary"
                  : "text-[#010813] hover:text-[#010813] text-sm"
              }`}
            >
              Activity
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4">
          {activeTab === "account" ? (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-3">
                {user.accountNumber && (
                  <div className="mt-4 flex items-center justify-between w-full gap-2 bg-[#F0F6FF] py-1 px-2.5 rounded-lg border border-[#E8EBF0]">
                    <h3 className="text-sm font-medium  text-[#010813]">
                      {user.name}
                    </h3>
                    <div className="flex items-center gap-x-1">
                      <span className="text-sm font-medium text-[#010813]">
                        {user.accountNumber}
                      </span>
                      <button className="rounded p-1 hover:bg-gray-100">
                        <Copy className="h-4 w-4 text-primary" />
                      </button>
                    </div>
                  </div>
                )}
                <h3 className="text-sm font-semibold text-[#010813]">
                  Personal information
                </h3>
                <div className="space-y-3 text-sm">
                  {user.dateJoined && (
                    <div className="flex justify-between">
                      <span className="text-[#A9ACB1] text-xs font-medium">
                        Date joined:
                      </span>
                      <span className="font-medium text-[#010813] text-sm">
                        {user.dateJoined}
                      </span>
                    </div>
                  )}
                  {user.highestAmountLent && (
                    <div className="flex justify-between">
                      <span className="text-[#A9ACB1] text-xs font-medium">
                        Highest amount lent:
                      </span>
                      <span className="font-medium text-[#010813] text-sm">
                        {user.highestAmountLent}
                      </span>
                    </div>
                  )}
                  {user.numberOfLoansGiven !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-[#A9ACB1] text-xs font-medium">
                        Number of loans given:
                      </span>
                      <span className="font-medium text-[#010813] text-sm">
                        {user.numberOfLoansGiven}
                      </span>
                    </div>
                  )}
                  {user.longestLendingPeriod && (
                    <div className="flex justify-between">
                      <span className="text-[#A9ACB1] text-xs font-medium">
                        Longest lending period:
                      </span>
                      <span className="font-medium text-[#010813] text-sm">
                        {user.longestLendingPeriod}
                      </span>
                    </div>
                  )}
                  {user.shortestLendingPeriod && (
                    <div className="flex justify-between">
                      <span className="text-[#A9ACB1] text-xs font-medium">
                        Shortest lending period:
                      </span>
                      <span className="font-medium text-[#010813] text-sm">
                        {user.shortestLendingPeriod}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Borrowed Section */}
              {(user.totalAmountBorrowed || user.highestAmountBorrowed) && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-[#010813] ">
                    Borrowed
                  </h3>
                  <div className="space-y-3 text-sm">
                    {user.totalAmountBorrowed && (
                      <div className="flex justify-between">
                        <span className="text-[#A9ACB1] text-xs font-medium">
                          Total amount borrowed:
                        </span>
                        <span className="font-medium text-[#010813] text-sm">
                          {user.totalAmountBorrowed}
                        </span>
                      </div>
                    )}
                    {user.highestAmountBorrowed && (
                      <div className="flex justify-between">
                        <span className="text-[#A9ACB1] text-xs font-medium">
                          Highest amount borrowed:
                        </span>
                        <span className="font-medium text-[#010813] text-sm">
                          {user.highestAmountBorrowed}
                        </span>
                      </div>
                    )}
                    {user.numberOfLoansCollected !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-[#A9ACB1] text-xs font-medium">
                          Number of loans collected:
                        </span>
                        <span className="font-medium text-[#010813] text-sm">
                          {user.numberOfLoansCollected}
                        </span>
                      </div>
                    )}
                    {user.lengthOfCreditHistory && (
                      <div className="flex justify-between">
                        <span className="text-[#A9ACB1] text-xs font-medium">
                          Length of credit history:
                        </span>
                        <span className="font-medium text-[#010813] text-sm">
                          {user.lengthOfCreditHistory}
                        </span>
                      </div>
                    )}
                    {user.longestLoanPeriod && (
                      <div className="flex justify-between">
                        <span className="text-[#A9ACB1] text-xs font-medium">
                          Longest loan period:
                        </span>
                        <span className="font-medium text-[#010813] text-sm">
                          {user.longestLoanPeriod}
                        </span>
                      </div>
                    )}
                    {user.shortestLoanPeriod && (
                      <div className="flex justify-between">
                        <span className="text-[#A9ACB1] text-xs font-medium">
                          Shortest loan period:
                        </span>
                        <span className="font-medium text-[#010813] text-sm">
                          {user.shortestLoanPeriod}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Loaned Section (for customers who lend) */}
              {user.highestAmountLent && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-[#010813] ">
                    Loaned
                  </h3>
                  <div className="space-y-3 text-sm">
                    {user.totalAmountBorrowed && (
                      <div className="flex justify-between">
                        <span className="text-[#A9ACB1] text-xs font-medium">
                          Total amount lent:
                        </span>
                        <span className="font-medium text-[#010813] text-sm">
                          {user.totalAmountBorrowed}
                        </span>
                      </div>
                    )}
                    {user.highestAmountLent && (
                      <div className="flex justify-between">
                        <span className="text-[#A9ACB1] text-xs font-medium">
                          Highest amount lent:
                        </span>
                        <span className="font-medium text-[#010813] text-sm">
                          {user.highestAmountLent}
                        </span>
                      </div>
                    )}
                    {user.numberOfLoansGiven !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-[#A9ACB1] text-xs font-medium">
                          Number of loans given:
                        </span>
                        <span className="font-medium text-[#010813] text-sm">
                          {user.numberOfLoansGiven}
                        </span>
                      </div>
                    )}
                    {user.longestLendingPeriod && (
                      <div className="flex justify-between">
                        <span className="text-[#A9ACB1] text-xs font-medium">
                          Longest lending period:
                        </span>
                        <span className="font-medium text-[#010813] text-sm">
                          {user.longestLendingPeriod}
                        </span>
                      </div>
                    )}
                    {user.shortestLendingPeriod && (
                      <div className="flex justify-between">
                        <span className="text-[#A9ACB1] text-xs font-medium">
                          Shortest lending period:
                        </span>
                        <span className="font-medium text-[#010813] text-sm">
                          {user.shortestLendingPeriod}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Credit Score */}
              {user.creditScore !== undefined && (
                <div className="space-x-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#010813] ">
                    Credit Score:
                  </h3>
                  <p className="text-2xl font-bold text-[#010813]">
                    {user.creditScore}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 pt-4">
              {/* Activity Tab Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="mb-3 text-xs font-semibold text-[#A9ACB1] ">
                    Today
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="text-[#010813] text-sm w-8 h-8 flex justify-center items-center bg-[#F2F3F5] rounded-full ">
                        ↙
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#010813]">
                          Added to wallet
                        </p>
                        <p className="text-xs text-[#A9ACB1] font-medium">
                          12:36 PM
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-[#010813] ">
                        +₦500
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-[#010813] text-sm w-8 h-8 flex justify-center items-center bg-[#F2F3F5] rounded-full ">
                        ↗
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#010813] ">
                          Withdrawal
                        </p>
                        <p className="text-xs text-[#A9ACB1] font-medium">
                          12:36 PM
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-[#010813]">
                        -₦500
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-semibold text-[#A9ACB1] ">
                    Yesterday
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="text-[#010813] text-sm w-8 h-8 flex justify-center items-center bg-[#F2F3F5] rounded-full ">
                        ↙
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#010813] ">
                          Added to wallet
                        </p>
                        <p className="text-xs text-[#A9ACB1] font-medium">
                          12:36 PM
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-[#010813]">
                        +₦450
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-[#010813] text-sm w-8 h-8 flex justify-center items-center bg-[#F2F3F5] rounded-full ">
                        ↗
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#010813]">
                          Withdrawal
                        </p>
                        <p className="text-xs text-[#A9ACB1] font-medium">
                          12:36 PM
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-[#010813]">
                        -₦300
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-semibold text-[#A9ACB1] ">
                    13/06/2024
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="text-[#010813] text-sm w-8 h-8 flex justify-center items-center bg-[#F2F3F5] rounded-full ">
                        ↙
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#010813]">
                          Borrowed money
                        </p>
                        <p className="text-xs text-[#A9ACB1] font-medium">
                          From @jorndorsi • 12:36 PM
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-[#010813]">
                        +₦450
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-[#010813] text-sm w-8 h-8 flex justify-center items-center bg-[#F2F3F5] rounded-full ">
                        ↗
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#010813]">
                          Gave a loan
                        </p>
                        <p className="text-xs text-[#A9ACB1] font-medium">
                          To @jorndorsi • 12:36 PM
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-[#010813]">
                        -₦300
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Suspend Button */}
        <div className="px-4">
          <Button variant="destructive" className=" w-full mt-4">
            Suspend
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDetailsSidebar;
