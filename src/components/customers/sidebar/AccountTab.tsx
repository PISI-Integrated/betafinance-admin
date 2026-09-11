import { formatCurrency, formatDate } from "@/lib/utils";
import { Copy } from "lucide-react";

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

export const AccountTab = ({
  customer,
}: {
  customer: ICustomerAnalyticsResponse;
}) => {
  const { user, loaned, borrowed } = customer;

  return (
    <div className="space-y-6">
      <div className="mt-4 flex items-center justify-between gap-2 rounded-lg border bg-[#F0F6FF] px-2.5 py-1">
        <h3 className="text-sm font-medium capitalize text-[#010813]">
          {user.name}
        </h3>
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">{user.account_number}</span>
          <Copy className="h-4 w-4 text-primary cursor-pointer" />
        </div>
      </div>

      <Section title="Personal information">
        <InfoRow label="Date joined:" value={formatDate(user.date_joined)} />
        <InfoRow
          label="Highest amount lent:"
          value={formatCurrency(loaned.highest_amount_lent, user.currency)}
        />
        <InfoRow
          label="Number of loans given:"
          value={loaned.number_of_loans_given}
        />
      </Section>

      <Section title="Borrowed">
        <InfoRow
          label="Total amount borrowed:"
          value={formatCurrency(borrowed.total_amount_borrowed, user.currency)}
        />
        <InfoRow
          label="Highest amount borrowed:"
          value={formatCurrency(
            borrowed.highest_amount_borrowed,
            user.currency,
          )}
        />
        <InfoRow
          label="Number of loans collected:"
          value={borrowed.number_of_loans_collected}
        />{" "}
        <InfoRow
          label="Length of credit history:"
          value={borrowed.length_of_credit_history_days}
        />{" "}
        <InfoRow
          label="Longest loan period:"
          value={borrowed.longest_loan_period_days}
        />{" "}
        <InfoRow
          label="Shortest loan period:"
          value={borrowed.shortest_loan_period_days}
        />
      </Section>

      <Section title="Loaned">
        <InfoRow
          label="Total amount lent:"
          value={formatCurrency(loaned.total_amount_lent, user.currency)}
        />
        <InfoRow
          label="Highest amount lent:"
          value={formatCurrency(loaned.highest_amount_lent, user.currency)}
        />
        <InfoRow
          label="Number of loans given:"
          value={loaned.number_of_loans_given}
        />
        <InfoRow
          label="Longest lending period:"
          value={loaned.longest_lending_period_days}
        />
        <InfoRow
          label="Shortest lending period:"
          value={loaned.shortest_lending_period_days}
        />
      </Section>

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Credit Score:</h3>
        <p className="text-2xl font-bold">{user.credit_score}</p>
      </div>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold text-[#010813]">{title}</h3>
    <div className="space-y-3 text-sm">{children}</div>
  </div>
);

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex justify-between">
    <span className="text-[#A9ACB1] text-xs font-medium">{label}</span>
    <span className="font-medium text-[#010813] text-sm">{value}</span>
  </div>
);
