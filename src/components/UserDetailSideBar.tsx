import React from "react";
import { Button } from "./ui/button";

interface UserDetailsSidebarProps {
  user: Partial<User> | null;
  onClose: () => void;
}

interface User {
  name: string;
  username: string;
  phoneNumber: string;
  dateJoined: string;
  highestAmountLent: string;
  loansGiven: string | number;
  longestLendingPeriod: string;
  shortestLendingPeriod: string;
  totalAmountBorrowed: string;
  highestAmountBorrowed: string;
  loansCollected: number;
  creditHistoryLength: string;
  longestLoanPeriod: string;
  shortestLoanPeriod: string;
  creditScore: number;
}

const UserDetailsSidebar: React.FC<UserDetailsSidebarProps> = ({
  user,
  onClose,
}) => {
  if (!user) return null;

  return (
    <div className="bg-white p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{user.name}</h2>
        <Button variant="ghost" onClick={onClose}>
          X
        </Button>
      </div>
      <p className="text-sm text-gray-500">@{user.username}</p>

      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-semibold">Account information</h3>
        <div className="text-gray-600">
          <div className="flex justify-between">
            <span>Date joined:</span>
            <span>{user.dateJoined}</span>
          </div>
          <div className="flex justify-between">
            <span>Highest amount lent:</span>
            <span>{user.highestAmountLent}</span>
          </div>
          <div className="flex justify-between">
            <span>Loans given:</span>
            <span>{user.loansGiven}</span>
          </div>
          <div className="flex justify-between">
            <span>Longest lending period:</span>
            <span>{user.longestLendingPeriod}</span>
          </div>
          <div className="flex justify-between">
            <span>Shortest lending period:</span>
            <span>{user.shortestLendingPeriod}</span>
          </div>
        </div>

        <h3 className="text-sm font-semibold mt-4">Borrowed</h3>
        <div className="text-gray-600">
          <div className="flex justify-between">
            <span>Total amount borrowed:</span>
            <span>{user.totalAmountBorrowed}</span>
          </div>
          <div className="flex justify-between">
            <span>Highest amount borrowed:</span>
            <span>{user.highestAmountBorrowed}</span>
          </div>
          <div className="flex justify-between">
            <span>Loans collected:</span>
            <span>{user.loansCollected}</span>
          </div>
          <div className="flex justify-between">
            <span>Credit history length:</span>
            <span>{user.creditHistoryLength}</span>
          </div>
          <div className="flex justify-between">
            <span>Longest loan period:</span>
            <span>{user.longestLoanPeriod}</span>
          </div>
          <div className="flex justify-between">
            <span>Shortest loan period:</span>
            <span>{user.shortestLoanPeriod}</span>
          </div>
        </div>

        <h3 className="text-sm font-semibold mt-4">Credit Score</h3>
        <p className="text-xl font-bold text-red-500">{user.creditScore}</p>
        <Button variant="destructive" className="w-full mt-4">
          Suspend
        </Button>
      </div>
    </div>
  );
};

export default UserDetailsSidebar;
