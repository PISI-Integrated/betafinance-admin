interface ILoginDto {
  phone: string;
  pin: string;
}

interface ILoginResponse {
  token: string;
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

interface ITopRankssResponse {
  rank: number;
  user_id: string;
  name: string;
  username: string;
  email: null | string;
  total_loans?: number;
}
