import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { useState } from "react";
import {
  useFetchSingleMarketerService,
  useDeleteMarketerService,
} from "@/services/marketers.service";
import UpdateMarketerModal from "../UpdateMarketerModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";

interface MarketersDetailsSidebarProps {
  marketerId: string;
  onClose: () => void;
}

const MarketersDetailsSidebar = ({
  marketerId,
  onClose,
}: MarketersDetailsSidebarProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { marketer, isMarketerLoading } =
    useFetchSingleMarketerService(marketerId);
  const { deleteMarketer, isMarketerLoading: isDeleting } =
    useDeleteMarketerService(marketerId);

  if (isMarketerLoading) {
    return <Card className="min-h-full animate-pulse bg-gray-200" />;
  }

  if (!marketer) return null;

  const handleConfirmDelete = async () => {
    await deleteMarketer();
    onClose();
  };

  return (
    <Card className="h-full rounded-lg border p-0 pb-4 overflow-y-auto">
      <CardContent className="flex h-full flex-col p-0">
        {/* Header */}
        <div className="p-4 pb-0">
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-semibold capitalize">
                {marketer.name}
              </h2>
              <p className="text-xs text-[#A9ACB1]">#{marketer.prefix}</p>
            </div>
            <button onClick={onClose}>
              <X className="h-5 w-5 text-[#A9ACB1]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pt-6 space-y-6">
          <div className="space-y-4">
            <div className="grid gap-4">
              <div>
                <p className="text-xs text-gray-500">Postback URL</p>
                <Link
                  href={marketer.postback_url}
                  target="_blank"
                  className="text-sm font-medium break-all"
                >
                  {marketer.postback_url || "N/A"}
                </Link>
              </div>
              <div>
                <p className="text-xs text-gray-500">Payout</p>
                <p className="text-sm font-medium">
                  {formatCurrency(Number(marketer.payout))}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    marketer.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {marketer.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Created At</p>
                <p className="text-sm font-medium">
                  {formatDate(marketer.created_at, true)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4 space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Marketer
          </Button>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete Marketer
          </Button>
        </div>
      </CardContent>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Marketer"
        description={`Are you sure you want to delete ${marketer.name}? This action cannot be undone.`}
      />

      <UpdateMarketerModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        marketer={marketer}
      />
    </Card>
  );
};

export default MarketersDetailsSidebar;
