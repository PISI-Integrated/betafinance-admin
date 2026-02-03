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
type loanType = "p2p" | "b2c";
type loanStatus =
  | "pending"
  | "approved"
  | "terms proposed"
  | "funded"
  | "active"
  | "repaid"
  | "defaulted"
  | "rejected"
  | "cancelled";
type kycStatus =
  | "not_started"
  | "in_progress"
  | "pending_validation"
  | "validated"
  | "failed"
  | "rejected";

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
    kycStatus: kycStatus;
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

interface ILoansParamsDto {
  loan_type: loanType;
  loan_status?: loanStatus;
  page?: number;
  size?: number;
}

interface ILoansResponse {
  page: number;
  page_size: number;
  total: number;
  items: {
    id: string;
    borrower: string;
    amount: number;
    lender: string | null;
    termdays: number;
    status: loanStatus;
    loantype: loanType;
    interestrate: number;
  }[];
}

interface ICustomersParamsDto {
  kyc_status?: kycStatus;
  page?: number;
  size?: number;
}

type rewardType = "airtime" | "discount" | "cash" | "bonus" | "none";
type PrizeType =
  | "cash"
  | "zero"
  | "nothing"
  | "jackpot"
  | "discount"
  | "interest"
  | "cashback"
  | "reward"

interface ISpinHistoryParamsDto {
  page: number;
  reward_type: rewardType;
  page_size: number;
  start_date: string;
  end_date: string;
  user_id: string;
  reward_id: string;
  min_value: number;
  max_value: number;
  sort_order: "asc" | "desc";
}

interface LottoHistoryItem {
  created_at: string;
  id: string;
  reward_id: string;
  reward_name: string;
  reward_type: PrizeType;
  reward_value: number;
  user_id: string;
}

interface ISpinHistoryResponse {
  items: LottoHistoryItem[];
  page: number;
  page_size: number;
  total: number;
}

interface IRewardDto {
  name: string;
  value: number;
  weight: number;
  type: rewardType;
  is_active: boolean;
  color: string;
  textColour: string;
}

interface ISpinRewardsParamsDto {
  page: number;
  size: number;
  is_active: boolean;
}

interface SpinRewardItem {
  id: string;
  name: string;
  value: number;
  weight: number;
  type: rewardType;
  is_active: boolean;
  textColour: string;
  color: string;
  created_at: string;
  updated_at: string;
}

interface ISpinRewardsResponse {
  rewards: SpinRewardItem[];
  page: number;
  size: number;
  total: number;
}
