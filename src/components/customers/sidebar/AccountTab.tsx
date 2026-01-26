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
      {user.account_number && (
        <div className="mt-4 flex items-center justify-between gap-2 rounded-lg border bg-[#F0F6FF] px-2.5 py-1">
          <h3 className="text-sm font-medium capitalize text-[#010813]">
            {user.name}
          </h3>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">{user.account_number}</span>
            <Copy className="h-4 w-4 text-primary cursor-pointer" />
          </div>
        </div>
      )}

      <Section title="Personal information">
        {user.date_joined && (
          <InfoRow label="Date joined:" value={formatDate(user.date_joined)} />
        )}
        {loaned.highest_amount_lent && (
          <InfoRow
            label="Highest amount lent:"
            value={formatCurrency(loaned.highest_amount_lent)}
          />
        )}
        {loaned.number_of_loans_given !== undefined && (
          <InfoRow
            label="Number of loans given:"
            value={loaned.number_of_loans_given}
          />
        )}
      </Section>

      {borrowed.total_amount_borrowed && (
        <Section title="Borrowed">
          <InfoRow
            label="Total amount borrowed:"
            value={formatCurrency(borrowed.total_amount_borrowed)}
          />
          {borrowed.highest_amount_borrowed && (
            <InfoRow
              label="Highest amount borrowed:"
              value={formatCurrency(borrowed.highest_amount_borrowed)}
            />
          )}
        </Section>
      )}

      {loaned.highest_amount_lent && (
        <Section title="Loaned">
          <InfoRow
            label="Highest amount lent:"
            value={formatCurrency(loaned.highest_amount_lent)}
          />
        </Section>
      )}

      {user.credit_score !== undefined && (
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Credit Score:</h3>
          <p className="text-2xl font-bold">{user.credit_score}</p>
        </div>
      )}
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
