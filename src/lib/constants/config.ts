const base_url = process.env.NEXT_PUBLIC_API_URL!;

const analytics_url = "admin/analytics";
const user_url = "admin/user";
const loans_url = "admin/loans";

const AUTH = {
  login: "/auth/admin-login",
  refresh: (refreshToken: string) =>
    `${base_url}auth/refresh?refresh_token=${refreshToken}`,
  setPin: "/auth/set-new-pin",
  logout: (refreshToken: string) =>
    `${base_url}auth/logout?refresh_token=${refreshToken}`,
  forgotPassword: "/auth/admin/forgot-password",
  resetPassword: "/auth/admin/reset-password",
};

const ANALYTICS = {
  overview: `${analytics_url}/overview`,
  monthlyTrends: `${analytics_url}/monthly-trends`,
  recentActivity: `${analytics_url}/recent-activity`,
  loanApplications: `${analytics_url}/loan-applications`,
  userStats: `${analytics_url}/user-stats`,
  topRankLenders: `${analytics_url}/top-ranking-lenders`,
  topRankCreditScores: `${analytics_url}/top-ranking-credit-score`,
  loanSummary: `${analytics_url}/loan-collection-summary`,
};

const CUSTOMER = {
  users: `${user_url}s`,
  userAnalytics: (userId: string) => `${user_url}/${userId}/analytics`,
  userActivitiess: (userId: string) => `${user_url}/${userId}/activity`,
  userDocuments: (userId: string) => `${user_url}/${userId}/documents`,
  updateUserDocuments: (userId: string, docsId: string) =>
    `${user_url}/${userId}/document/${docsId}`,
  suspendUser: (userId: string) => `${user_url}/${userId}/suspend`,
  generateDocsDownloadLink: (file_url: string) =>
    `upload/?file_url=${file_url}`,
};

const LOAN = {
  loans: `${loans_url}`,
  loansTotalAmount: `${loans_url}/amount`,
  loansCount: `${loans_url}/count`,
};

const SPIN = {
  history: `/admin/spin-histories`,
  rewards: `/admin/rewards`,
  createReward: `/admin/reward`,
  rewardByID: (rewardId: string) => `/admin/reward/${rewardId}`,
  rewardStats: `/admin/reward/stats`,
};

const ADMIN = {
  list: `/admin/admin-users`,
  invite: `/admin/invite-admin`,
  resendInvite: `/admin/resend-admin-invite`,
  settings: `/admin/settings`,
  profile: `/user/profile/simple`,
  permissions: `/admin/permissions`,
  roles: `/admin/roles`,
  updateRole: (role_id: string) => `/admin/roles/${role_id}`,
};

const MARKETERS = {
  list: `/admin/marketers`,
  create: `/admin/marketer`,
  action: (marketerId: string) => `/admin/marketer/${marketerId}`,
};

const TRANSACTIONS = {
  list: `/admin/transactions`,
};

const EXPORT = {
  overview: `/admin/analytics/overview/export`,
  monthlyTrends: `/admin/analytics/monthly-trends/export`,
  userStats: `/admin/analytics/user-stats/export`,
  loanSummary: `/admin/analytics/loan-collection-summary/export`,
  loans: `/admin/loans/export`,
  users: `/admin/users/export`,
  transactions: `/admin/transactions/export`,
};

export {
  base_url,
  AUTH,
  ANALYTICS,
  CUSTOMER,
  LOAN,
  SPIN,
  ADMIN,
  MARKETERS,
  TRANSACTIONS,
  EXPORT,
};
