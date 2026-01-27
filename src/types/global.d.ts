interface ILoginDto {
  phone: string;
  pin: string;
}

interface ILoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    phone: string;
    name: string;
    email: string;
    accountNumber: null;
    isVerified: boolean;
    kycStatus: string;
    creditScore: number;
    virtualAccount: null;
  };
}

interface IOverviewResponse {
  total_users: number;
  new_users_this_month: number;
  user_growth_percentage: number;
  active_loans: number;
  new_loans_this_month: number;
  loan_growth_percentage: number;
  total_transaction_volume: number;
  volume_this_month: number;
  volume_growth_percentage: number;
  average_credit_score: number;
}

interface ITopRankItem {
  rank: number;
  user_id: string;
  name: string;
  username: string;
  email: null | string;
  total_loans?: number;
  credit_score?: number;
}

type ITopRankssResponse = ITopRankItem[];

interface ICustomersResponse {
  page: number;
  page_size: number;
  total: number;
  items: {
    id: string;
    phone: string;
    name: string;
    accountNumber: string;
    isVerified: boolean;
    creditScore: number;
    email: string | null;
    totalLoans: number;
    createdAt: string;
  }[];
}

interface ICustomerAnalyticsResponse {
  user: {
    id: string;
    name: string;
    username: string;
    account_number: string;
    date_joined: string;
    credit_score: number;
  };
  borrowed: {
    total_amount_borrowed: number;
    highest_amount_borrowed: number;
    number_of_loans_collected: number;
    length_of_credit_history_days: number;
    longest_loan_period_days: number;
    shortest_loan_period_days: number;
  };
  loaned: {
    total_amount_lent: number;
    highest_amount_lent: number;
    number_of_loans_given: number;
    longest_lending_period_days: number;
    shortest_lending_period_days: number;
  };
}

interface ICustomerActivityParamsDto {
  transaction_status: string;
  transaction_type: string;
  from_date: string;
  to_date: string;
}

interface ICustomerActivityResponse {
  amount: string;
  description: string;
  status: "completed" | "pending" | "failed";
  recipient_bank: string | null;
  recipient_name: string | null;
  paystack_reference: string | null;
  authorization_url: string | null;
  created_at: string;
  user_id: string;
  id: string;
  type: "debit" | "credit";
  reference: string;
  payment_method: "wallet" | "card";
  recipient_account: string | null;
  loan_id: string;
  updated_at: string;
}

interface ICustomerDocsParamsDto {
  limit: number;
  page: number;
  size: number;
}

type docsStatusType = "pending" | "approved" | "rejected";

interface updateDocsStatusDto {
  status: docsStatusType;
}

interface ICustomerDocument {
  id: string;
  user_id: string;
  document_type: string;
  side: "front" | "back";
  file_name: string;
  file_path: string | null;
  file_size: string | number;
  file_url_front: string | null;
  file_url_back: string | null;
  status: docsStatusType;
  verified: boolean;
  uploaded_at: string;
}

