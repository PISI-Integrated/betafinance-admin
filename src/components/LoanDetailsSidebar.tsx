import { X } from "lucide-react";
import { LoanBetaRow, LoanP2PRow } from "@/types/types";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface LoanDetailsSidebarProps {
  loan: LoanP2PRow | LoanBetaRow | null;
  onClose: () => void;
}

// Type guard to check if loan is P2P
const isP2PLoan = (loan: LoanP2PRow | LoanBetaRow): loan is LoanP2PRow => {
  return "lender" in loan;
};

const LoanDetailsSidebar = ({ loan, onClose }: LoanDetailsSidebarProps) => {
  if (!loan) return null;

  const isP2P = isP2PLoan(loan);

  return (
    <Card className="h-full overflow-hidden rounded-lg border-gray-200 p-0 pb-4">
      <CardContent className="flex h-full flex-col p-0">
        {/* Header */}
        <div className="p-4 pb-2 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#010813]">
                {loan.amount}
              </h2>
              <p className="text-[#A9ACB1] text-xs font-medium">
                {isP2P ? "P2P Loan" : "Beta Loan"}
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
            {/* Loan Details Section */}
            <div>
              <h3 className="text-sm font-semibold text-[#010813] mb-3">
                Loan Details
              </h3>
              <div className="space-y-3">
                {/* Borrower */}
                <div className="flex flex-col gap-y-1">
                  <span className="text-[#344054] text-xs">Borrower</span>
                  <span className="font-medium text-[#010813] text-sm">
                    {loan.borrower}
                  </span>
                </div>

                {/* Lender - Only for P2P */}
                {isP2P && loan.lender && (
                  <div className="flex flex-col gap-y-1">
                    <span className="text-[#344054] text-xs">Lender</span>
                    <span className="font-medium text-[#010813] text-sm">
                      {loan.lender}
                    </span>
                  </div>
                )}

                {/* Loan Period */}
                <div className="flex flex-col gap-y-1">
                  <span className="text-[#344054] text-xs">Loan Period</span>
                  <span className="font-medium text-[#010813] text-sm">
                    {loan.loanPeriod}
                  </span>
                </div>

                {/* Interest - Only for P2P */}
                {isP2P && loan.interest && (
                  <div className="flex flex-col gap-y-1">
                    <span className="text-[#344054] text-xs">Interest Rate</span>
                    <span className="font-medium text-[#010813] text-sm">
                      {loan.interest}
                    </span>
                  </div>
                )}

                {/* Type - Only for P2P */}
                {isP2P && loan.type && (
                  <div className="flex flex-col gap-y-1">
                    <span className="text-[#344054] text-xs">Type</span>
                    <span
                      className={`w-fit text-sm font-medium px-2 py-1 rounded-lg ${loan.type === "Request"
                          ? "text-[#3B82F6] bg-[#EFF6FF]"
                          : "text-[#8B5CF6] bg-[#F5F3FF]"
                        }`}
                    >
                      {loan.type}
                    </span>
                  </div>
                )}

                {/* Date */}
                <div className="flex flex-col gap-y-1">
                  <span className="text-[#344054] text-xs">Date</span>
                  <span className="font-medium text-[#010813] text-sm">
                    {loan.date}
                  </span>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-y-1">
                  <span className="text-[#344054] text-xs">Status</span>
                  <span className="font-medium text-[#010813] text-sm">
                    {loan.status}
                  </span>
                </div>

                {/* Loan ID */}
                <div className="flex flex-col gap-y-1">
                  <span className="text-[#344054] text-xs">Loan ID</span>
                  <span className="font-medium text-[#010813] text-sm">
                    #{loan.id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Only for Beta Loans */}
          {!isP2P && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-[#010813] mb-3">
                Actions
              </h3>
              <div className="flex gap-2">
                <Button variant="default" className="w-full">
                  Approve
                </Button>
                <Button variant="destructive" className="w-full">
                  Reject
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanDetailsSidebar;
