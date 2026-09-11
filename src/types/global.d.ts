interface ICustomError {
  response: {
    data: {
      detail?: string;
      [key: string]: string[] | undefined;
    };
  };
  status?: number;
}

interface ILoginDto {
  email: string;
  password: string;
  pin?: string;
}

interface ISetPinDto {
  pin: string;
  reset_token: string;
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
    avatar: string | null;
  };
}

interface IResetPasswordResponse {
  success: boolean;
  message: string;
  phone: string;
  expiresInMinutes: number;
  errorCode: string;
  timestamp: string;
}
interface IForgotPasswordDto {
  email: string;
}

interface IResetPasswordDto {
  resettoken: string;
  newpassword: string;
}

interface IForgotPasswordResponse {
  success: boolean;
  message: string;
  resettoken: string;
  expiresInMinutes: number;
  errorCode: string;
  timestamp: string;
}

interface IOverviewResponse {
  total_users: number;
  total_loans_collected: number;
  total_amount_in_loans: number;
  total_amount_in_loan_last_30_days: number;
  new_users_this_month: number;
  new_users_today: number;
  user_growth_percentage: number;
  active_loans: number;
  new_loans_this_month: number;
  loan_growth_percentage: number;
  total_transaction_volume: number;
  volume_this_month: number;
  volume_growth_percentage: number;
  average_credit_score: number;
  total_credit_transactions: number;
  total_debit_transactions: number;
  total_balance_transactions: number;
  total_revenue: number;
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
    isSuspended: boolean;
    suspensionReason: string;
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
    currency: currencyType;
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
  currency: currencyType;
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
  region?: regionType;
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
    createdat: string;
  }[];
}

interface ICustomersParamsDto {
  kyc_status?: kycStatus;
  page?: number;
  size?: number;
  region?: regionType;
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
  | "reward";

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
  name: string;
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
  is_active?: boolean;
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

interface ISpinRewardStatsResponse {
  total_reward_amount: number;
  total_reward_used: number;
}

interface IRecentActivityResponse {
  activities: {
    id: string;
    user: {
      name: string;
      initials: string;
      avatar: string | null;
    };
    action: string;
    timestamp: string;
    status: string;
  }[];
}

interface IMonthlyTrendResponse {
  trends: {
    name: string;
    users: number;
    loans: number;
    transactions: number;
  }[];
}

interface ILoanCollectionSummaryDto {
  period: "day" | "week" | "month" | "year";
  year: number;
  month?: number;
  region?: regionType;
}

interface ILoanCollectionSummaryResponse {
  period: ILoanCollectionSummaryDto["period"];
  data: {
    label: number;
    total_collected: number;
  }[];
}

interface IPaginationParamsDto {
  page: number;
  page_size: number;
}

interface IAdminListItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status?:
    | "active"
    | "inactive"
    | "suspended"
    | "not_started"
    | "pending_validation"
    | "validated";
  createdAt: string;
  isSuspended: boolean;
  suspensionReason: string | null;
  roles: IRolesResponse[];
}

interface IAdminListResponse {
  items: IAdminListItem[];
  page: number;
  page_size: number;
  total: number;
}

interface IInviteAdminDto {
  name: string;
  email: string;
  phone: string;
  role_names?: string[];
}

interface ISuspendUserDto {
  suspend: boolean;
  reason?: string;
}

interface IOverviewParamsDto {
  start_date?: string;
  end_date?: string;
  region?: regionType;
}

interface IMarketerParamsDto {
  limit?: number;
  skip?: number;
  is_active?: boolean;
}

interface IMarketerResponse {
  total: number;
  items: [
    {
      name: string;
      prefix: string;
      postback_url: string;
      payout: string;
      is_active: boolean;
      id: string;
      created_at: string;
      updated_at: string;
    },
  ];
}

interface ICreateMarketerDto {
  name: string;
  prefix: string;
  postback_url?: string;
  payout: number;
  is_active: boolean;
}

interface IFeeTier {
  min_amount: number;
  fee: number;
}

interface IFeeScheduleItem {
  effective_from?: string | null;
  flat_fee?: number | null;
  tiers?: IFeeTier[] | null;
  percentage?: number | null;
}

interface IInterestRateCapItem {
  min_score: number;
  cap: number;
}

interface IAdminSettingsResponse {
  p2p_platform_fee_percentage: number;
  gnugrid_crb_fee_ugx: string;
  gnugrid_crb_freshness_days: number;
  id: string;
  p2p_interest_rate_caps: {
    NG: IInterestRateCapItem[];
    UG: IInterestRateCapItem[];
  };
  withdrawal_fee_schedules: {
    yo?: IFeeScheduleItem[];
    dusupay?: IFeeScheduleItem[];
    momo?: IFeeScheduleItem[];
    paystack?: IFeeScheduleItem[];
  };
  deposit_fee_schedules: {
    yo?: IFeeScheduleItem[];
    dusupay?: IFeeScheduleItem[];
    momo?: IFeeScheduleItem[];
    paystack?: IFeeScheduleItem[];
  };
  updated_at: string;
  updated_by_id: string;
}

interface IUpdateAdminSettingsDto {
  p2p_platform_fee_percentage: number;
  gnugrid_crb_fee_ugx: number;
  gnugrid_crb_freshness_days: number;
  p2p_interest_rate_caps: {
    NG: IInterestRateCapItem[];
    UG: IInterestRateCapItem[];
  };
  withdrawal_fee_schedules: {
    yo?: IFeeScheduleItem[];
    dusupay?: IFeeScheduleItem[];
    momo?: IFeeScheduleItem[];
    paystack?: IFeeScheduleItem[];
  };
  deposit_fee_schedules: {
    yo?: IFeeScheduleItem[];
    dusupay?: IFeeScheduleItem[];
    momo?: IFeeScheduleItem[];
    paystack?: IFeeScheduleItem[];
  };
}

interface IPermissionsResponse {
  name: string;
  description: string;
  id: string;
  created_at: string;
}

interface IAdminProfileResponse {
  id: string;
  phone: string;
  name: string;
  username: string;
  email: string;
  is_verified: boolean;
  credit_score: number;
  creditScore: number;
  account_number: string | null;
  accountNumber: string | null;
  kycStatus: kycStatus;
  created_at: string;
  updated_at: string;
}

interface IRoleDto {
  name: string;
  description: string;
  permission_names: string[];
}

interface IRolesResponse {
  name: string;
  description: string;
  id: string;
  created_at: string;
  permissions: IPermissionsResponse[];
}

interface ITransactionListItem {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  amount: string;
  type: "debit" | "credit";
  currency?: currencyType;
  description: string;
  reference: string;
  status: "completed" | "pending" | "failed";
  paymentMethod: "card" | "wallet";
  recipientBank: string | null;
  recipientAccount: string | null;
  recipientName: string | null;
  loanId: string;
  paystackReference: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ITransactionListResponse {
  items: ITransactionListItem[];
  page: number;
  page_size: number;
  total: number;
}

type regionType = "NG" | "UG" | "all";
type currencyType = "UGX" | "NGN";

interface ITransactionParamsDto {
  status: string;
  type: string;
  payment_method: string;
  user_id: string;
  search: string;
  start_date: string;
  end_date: string;
  page: number;
  size: number;
  region?: regionType;
}

type transactionStatus = "completed" | "pending" | "failed";
type transactionType = "debit" | "credit";

interface IExportParamsDto {
  start_date?: string;
  end_date?: string;
  format: "csv" | "pdf";
  months?: number;
  month?: number;
  period?: "day" | "week" | "month" | "year";
  year?: number;
  loan_type?: loanType;
  kyc_status?: kycStatus;
  type?: transactionType;
  status?: transactionStatus;
}

interface IProviderBalanceItem {
  provider: string;
  supported: boolean;
  balances?: {
    [key: string]: string | number;
  };
}

interface IProviderBalancesResponse {
  providers: IProviderBalanceItem[];
}

interface IWalletBalancesResponse {
  balances: Record<currencyType, string>;
}

interface IWalletResponse {
  balance: string;
  virtual_account: {
    account_number: string;
    account_name: string;
    bank_name: string;
    is_active: boolean;
    note: string;
  };
}
