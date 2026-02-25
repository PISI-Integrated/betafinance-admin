import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SuspendConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  isLoading?: boolean;
  isSuspending: boolean;
}

const SUSPEND_REASON_OPTIONS = [
  "Violation of Terms of Service",
  "Fraudulent Activity",
  "Account Security Compromise",
  "Requested by User",
  "other",
];

const UNSUSPEND_REASON_OPTIONS = [
  "User has resolved the issue",
  "Account is now secure",
  "Requested by User",
  "other",
];

const SuspendConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  isSuspending,
}: SuspendConfirmationModalProps) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [otherReason, setOtherReason] = useState<string>("");

  const handleConfirm = () => {
    let finalReason = selectedReason === "other" ? otherReason : selectedReason;
    onConfirm(finalReason);
  };

  // Reset state when closed
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      setTimeout(() => {
        setSelectedReason("");
        setOtherReason("");
      }, 300);
    }
  };

  const reasonOptions = isSuspending
    ? SUSPEND_REASON_OPTIONS
    : UNSUSPEND_REASON_OPTIONS;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isSuspending ? "Suspend User" : "Unsuspend User"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            {isSuspending
              ? "Are you sure you want to suspend this user?"
              : "Are you sure you want to unsuspend this user?"}
          </p>

          <div className="space-y-2">
            <label className="text-sm font-medium">Reason</label>
            <Select value={selectedReason} onValueChange={setSelectedReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {reasonOptions.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason === "other" ? "Other" : reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedReason === "other" && (
            <div className="flex flex-col space-y-2 animate-in fade-in slide-in-from-top-2">
              <label className="text-sm font-medium">Please specify</label>
              <textarea
                placeholder="Enter specific reason..."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                rows={3}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant={isSuspending ? "destructive" : "default"}
            onClick={handleConfirm}
            disabled={
              isLoading ||
              !selectedReason ||
              (selectedReason === "other" && !otherReason.trim())
            }
          >
            {isLoading ? "Processing..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuspendConfirmationModal;
