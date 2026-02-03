import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useFetchCustomerDocsService,
  useUpdateCustomerDocsService,
} from "@/services/users.service";
import { formatDate } from "@/lib/utils";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DocumentsTabProps {
  userId: string;
}

export const DocumentsTab = ({ userId }: DocumentsTabProps) => {
  const [page, setPage] = useState(1);
  const size = 5;

  const {
    customerDocs,
    isDocsLoading,
    refetchDocs: refetchDocuments,
  } = useFetchCustomerDocsService(userId, {
    page: page,
    limit: size,
    size: size,
  });

  const documents = (customerDocs ?? []) as ICustomerDocument[];

  const pendingCount = useMemo(
    () => documents.filter((doc) => doc.status === "pending").length,
    [documents],
  );

  return (
    <div className="space-y-4">
      <Card className="border bg-[#F9FAFB]">
        <CardContent className="flex flex-col gap-x-3 p-0 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium text-[#6B7280] uppercase">
            KYC documents
          </p>

          <p className="text-sm font-semibold text-[#111827]">
            {pendingCount} Pending
          </p>
        </CardContent>
      </Card>

      {isDocsLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 w-full animate-pulse rounded-md bg-gray-100" />
          ))}
        </div>
      ) : documents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-sm text-gray-400">
            No documents have been uploaded for this user yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-3">
            {documents.map((doc) => (
              <DocumentRow
                key={doc.id}
                userId={userId}
                doc={doc}
                onUpdated={() => refetchDocuments()}
              />
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-4 px-1">
            <span className="text-xs font-medium text-gray-500">
              Page {page}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="h-8 w-8 text-gray-600 hover:bg-gray-100 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={documents.length < size}
                className="h-8 w-8 text-gray-600 hover:bg-gray-100 disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DocumentRow = ({
  userId,
  doc,
  onUpdated,
}: {
  userId: string;
  doc: ICustomerDocument;
  onUpdated: () => void;
}) => {
  const { updateDocsStatus, isDocsLoading: isUpdating } =
    useUpdateCustomerDocsService(userId, doc.id);

  const handleUpdateStatus = (status: docsStatusType) => {
    if (isUpdating) return;
    updateDocsStatus({ status });
    void onUpdated();
  };

  const docUrl = doc.file_path ?? doc.file_url_front ?? doc.file_url_back;

  return (
    <div className="flex flex-col gap-3 rounded-md border px-3 py-2 ">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-medium text-[#111827] capitalize">
            {doc.document_type.replace(/_/g, " ")} ({doc.side})
          </p>
          <p className="text-xs text-[#6B7280]">
            Uploaded {formatDate(doc.uploaded_at)}
          </p>
        </div>
        <Badge
          variant={
            doc.status === "approved"
              ? "success"
              : doc.status === "rejected"
                ? "destructive"
                : "pending"
          }
          className="text-xs capitalize"
        >
          {doc.status}
        </Badge>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-wrap items-center gap-2">
          {docUrl && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-3 text-xs"
                >
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] max-w-2xl overflow-hidden p-0">
                <DialogHeader className="px-6 pt-4 pb-2">
                  <DialogTitle className="text-sm font-semibold">
                    {doc.document_type.replace(/_/g, " ")} ({doc.side})
                  </DialogTitle>
                </DialogHeader>
                <div className="px-6 pb-4 text-xs text-[#4B5563] break-all">
                  {docUrl}
                </div>
                <div className="h-[60vh] w-full border-t bg-black/5">
                  <iframe
                    src={docUrl}
                    className="h-full w-full border-0"
                    title={doc.file_name}
                  />
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {doc.status === "pending" && (
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              className="h-7 px-3 text-xs"
              disabled={isUpdating}
              variant={'destructive'}
              onClick={() => handleUpdateStatus("rejected")}
            >
              Reject
            </Button>
            <Button
              size="sm"
              className="h-7 px-3 text-xs"
              disabled={isUpdating}
              onClick={() => handleUpdateStatus("approved")}
            >
              Approve
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

