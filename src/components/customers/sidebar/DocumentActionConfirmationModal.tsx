import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatEnumString } from "@/lib/utils";
import { Info } from "lucide-react";

interface DocumentActionConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  action: "approve" | "reject";
  documentType: string;
  hasSibling?: boolean;
}

const DocumentActionConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  action,
  documentType,
  hasSibling = false,
}: DocumentActionConfirmationModalProps) => {
  const isApprove = action === "approve";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="capitalize">{action} Document</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-4 text-sm text-muted-foreground">
          <p>
            Are you sure you want to{" "}
            <span className="font-medium text-foreground">{action}</span> this{" "}
            <span className="font-medium text-foreground uppercase">
              {formatEnumString(documentType)}
            </span>
            ? This action cannot be undone.
          </p>

          {hasSibling && (
            <div
              className={`flex items-start gap-2 rounded-md border px-3 py-2 text-xs ${
                isApprove
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-amber-200 bg-amber-50 text-amber-700"
              }`}
            >
              <span className="mt-0.5 shrink-0">
                <Info size={12} />
              </span>
              <span>
                The other side of this document is also pending. It will be
                automatically <strong>{action}d</strong> at the same time.
              </span>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant={isApprove ? "default" : "destructive"}
            onClick={onConfirm}
            disabled={isLoading}
            loading={isLoading}
          >
            {isLoading
              ? isApprove
                ? "Approving..."
                : "Rejecting..."
              : isApprove
                ? "Approve"
                : "Reject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentActionConfirmationModal;
