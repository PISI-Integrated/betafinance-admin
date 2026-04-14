"use client";

import {
  useExportLoansApi,
  useExportOverviewApi,
  useExportTransactionsApi,
  useExportUsersApi,
} from "@/api/export.api";
import toast from "react-hot-toast";

const useExportOverviewService = () => {
  const { mutateAsync, isPending: isExportOverviewPending } =
    useExportOverviewApi();

  const exportOverview = async (params?: IExportParamsDto) => {
    try {
      const blob = await mutateAsync(params);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      const extension = params?.format || "csv";
      link.download = `overview-report.${extension}`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success(
        `Overview exported successfully as ${extension.toUpperCase()}`,
      );
    } catch (error) {
      toast.error("Error exporting overview");
      console.error("Export Error:", error);
    }
  };

  return {
    exportOverview,
    isExportOverviewPending,
  };
};

const useExportLoansService = () => {
  const { mutateAsync, isPending: isExportLoansPending } = useExportLoansApi();

  const exportLoans = async (params?: IExportParamsDto) => {
    try {
      const blob = await mutateAsync(params);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      const extension = params?.format || "csv";
      link.download = `loans-report.${extension}`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success(
        `Loans exported successfully as ${extension.toUpperCase()}`,
      );
    } catch (error) {
      toast.error("Error exporting loans");
      console.error("Export Error:", error);
    }
  };

  return {
    exportLoans,
    isExportLoansPending,
  };
};

const useExportUsersService = () => {
  const { mutateAsync, isPending: isExportUsersPending } = useExportUsersApi();

  const exportUsers = async (params?: IExportParamsDto) => {
    try {
      const blob = await mutateAsync(params);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      const extension = params?.format || "csv";
      link.download = `users-report.${extension}`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success(
        `Users exported successfully as ${extension.toUpperCase()}`,
      );
    } catch (error) {
      toast.error("Error exporting users");
      console.error("Export Error:", error);
    }
  };

  return {
    exportUsers,
    isExportUsersPending,
  };
};

const useExportTransactionsService = () => {
  const { mutateAsync, isPending: isExportTransactionsPending } =
    useExportTransactionsApi();

  const exportTransactions = async (params?: IExportParamsDto) => {
    try {
      const blob = await mutateAsync(params);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      const extension = params?.format || "csv";
      link.download = `transactions-report.${extension}`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success(
        `Transactions exported successfully as ${extension.toUpperCase()}`,
      );
    } catch (error) {
      toast.error("Error exporting transactions");
      console.error("Export Error:", error);
    }
  };

  return {
    exportTransactions,
    isExportTransactionsPending,
  };
};

export {
  useExportOverviewService,
  useExportLoansService,
  useExportUsersService,
  useExportTransactionsService,
};
