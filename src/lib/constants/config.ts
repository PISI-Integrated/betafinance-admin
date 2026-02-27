const base_url = process.env.NEXT_PUBLIC_API_URL!;

const analytics_url = "admin/analytics";
const user_url = "admin/user";
const loans_url = "admin/loans";

const AUTH = {
  login: "/auth/admin-login",
  refresh: (refreshToken: string) =>
    `${base_url}auth/refresh?refresh_token=${refreshToken}`,
  setPin: "/auth/set-new-pin",
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
};

export { base_url, AUTH, ANALYTICS, CUSTOMER, LOAN, SPIN, ADMIN };
