import React, { useState } from "react";
import { Button } from "./ui/button";
import { X, Copy } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface UserDetailsSidebarProps {
  user: Partial<User> | null;
  onClose: () => void;
}

interface User {
  name: string;
  username: string;
  accountNumber?: string;
  phoneNumber?: string;
  dateJoined?: string;
  highestAmountLent?: string;
  loansGiven?: string | number;
  longestLendingPeriod?: string;
  shortestLendingPeriod?: string;
  totalAmountBorrowed?: string;
  highestAmountBorrowed?: string;
  loansCollected?: number;
  creditHistoryLength?: string;
  longestLoanPeriod?: string;
  shortestLoanPeriod?: string;
  creditScore?: number;
  status?: string;
  dateAdded?: string;
}

const UserDetailsSidebar: React.FC<UserDetailsSidebarProps> = ({
  user,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"account" | "activity">(
    "account",
  );

  if (!user) return null;

  return (
    <Card className="h-full overflow-hidden rounded-lg border-gray-200">
      <CardContent className="flex h-full flex-col p-0">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Account Number (if exists) */}
          {user.accountNumber && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">
                {user.accountNumber}
              </span>
              <button className="rounded p-1 hover:bg-gray-100">
                <Copy className="h-4 w-4 text-blue-600" />
              </button>
            </div>
          )}

          {/* Tabs */}
          <div className="mt-4 flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("account")}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "account"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Account information
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "activity"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Activity
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "account" ? (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Personal information
                </h3>
                <div className="space-y-3 text-sm">
                  {user.dateJoined && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date joined:</span>
                      <span className="font-medium text-gray-900">
                        {user.dateJoined}
                      </span>
                    </div>
                  )}
                  {user.highestAmountLent && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Highest amount lent:
                      </span>
                      <span className="font-medium text-gray-900">
                        {user.highestAmountLent}
                      </span>
                    </div>
                  )}
                  {user.loansGiven !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Number of loans given:
                      </span>
                      <span className="font-medium text-gray-900">
                        {user.loansGiven}
                      </span>
                    </div>
                  )}
                  {user.longestLendingPeriod && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Longest lending period:
                      </span>
                      <span className="font-medium text-gray-900">
                        {user.longestLendingPeriod}
                      </span>
                    </div>
                  )}
                  {user.shortestLendingPeriod && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Shortest lending period:
                      </span>
                      <span className="font-medium text-gray-900">
                        {user.shortestLendingPeriod}
                      </span>
                    </div>
                  )}
                  {user.phoneNumber && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone number:</span>
                      <span className="font-medium text-gray-900">
                        {user.phoneNumber}
                      </span>
                    </div>
                  )}
                  {user.status && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span
                        className={`font-medium ${
                          user.status === "active"
                            ? "text-orange-600"
                            : "text-gray-900"
                        }`}
                      >
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </span>
                    </div>
                  )}
                  {user.dateAdded && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date added:</span>
                      <span className="font-medium text-gray-900">
                        {user.dateAdded}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Borrowed Section */}
              {(user.totalAmountBorrowed || user.highestAmountBorrowed) && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Borrowed
                  </h3>
                  <div className="space-y-3 text-sm">
                    {user.totalAmountBorrowed && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Total amount borrowed:
                        </span>
                        <span className="font-medium text-gray-900">
                          {user.totalAmountBorrowed}
                        </span>
                      </div>
                    )}
                    {user.highestAmountBorrowed && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Highest amount borrowed:
                        </span>
                        <span className="font-medium text-gray-900">
                          {user.highestAmountBorrowed}
                        </span>
                      </div>
                    )}
                    {user.loansCollected !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Number of loans collected:
                        </span>
                        <span className="font-medium text-gray-900">
                          {user.loansCollected}
                        </span>
                      </div>
                    )}
                    {user.creditHistoryLength && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Length of credit history:
                        </span>
                        <span className="font-medium text-gray-900">
                          {user.creditHistoryLength}
                        </span>
                      </div>
                    )}
                    {user.longestLoanPeriod && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Longest loan period:
                        </span>
                        <span className="font-medium text-gray-900">
                          {user.longestLoanPeriod}
                        </span>
                      </div>
                    )}
                    {user.shortestLoanPeriod && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Shortest loan period:
                        </span>
                        <span className="font-medium text-gray-900">
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
                  <h3 className="text-sm font-semibold text-gray-900">
                    Loaned
                  </h3>
                  <div className="space-y-3 text-sm">
                    {user.totalAmountBorrowed && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total amount lent:</span>
                        <span className="font-medium text-gray-900">
                          {user.totalAmountBorrowed}
                        </span>
                      </div>
                    )}
                    {user.highestAmountLent && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Highest amount lent:
                        </span>
                        <span className="font-medium text-gray-900">
                          {user.highestAmountLent}
                        </span>
                      </div>
                    )}
                    {user.loansGiven !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Number of loans given:
                        </span>
                        <span className="font-medium text-gray-900">
                          {user.loansGiven}
                        </span>
                      </div>
                    )}
                    {user.longestLendingPeriod && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Longest lending period:
                        </span>
                        <span className="font-medium text-gray-900">
                          {user.longestLendingPeriod}
                        </span>
                      </div>
                    )}
                    {user.shortestLendingPeriod && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          Shortest lending period:
                        </span>
                        <span className="font-medium text-gray-900">
                          {user.shortestLendingPeriod}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Credit Score */}
              {user.creditScore !== undefined && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Credit Score:
                  </h3>
                  <p className="text-3xl font-bold text-gray-900">
                    {user.creditScore}
                  </p>
                </div>
              )}

              {/* Suspend Button */}
              <Button
                variant="destructive"
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Suspend
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Activity Tab Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="mb-3 text-xs font-semibold text-gray-500">
                    Today
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="text-gray-900">↙</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Added to wallet
                        </p>
                        <p className="text-xs text-gray-500">12:36 PM</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        +₦500
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-gray-900">↗</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Withdrawal
                        </p>
                        <p className="text-xs text-gray-500">12:36 PM</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        -₦500
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-semibold text-gray-500">
                    Yesterday
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="text-gray-900">↙</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Added to wallet
                        </p>
                        <p className="text-xs text-gray-500">12:36 PM</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        +₦450
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-gray-900">↗</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Withdrawal
                        </p>
                        <p className="text-xs text-gray-500">12:36 PM</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        -₦300
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-semibold text-gray-500">
                    13/06/2024
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="text-gray-900">↙</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Borrowed money
                        </p>
                        <p className="text-xs text-gray-500">
                          From @jorndorsi • 12:36 PM
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        +₦450
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-gray-900">↗</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Gave a loan
                        </p>
                        <p className="text-xs text-gray-500">
                          To @jorndorsi • 12:36 PM
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        -₦300
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suspend Button */}
              <Button
                variant="destructive"
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Suspend
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDetailsSidebar;
