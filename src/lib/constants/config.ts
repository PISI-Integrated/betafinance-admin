const base_url = process.env.NEXT_PUBLIC_API_URL!;

const analytics_url = "admin/analytics";
const user_url = "admin/user";
const loans_url = "admin/loans";

const AUTH = {
  login: "/auth/login",
  refresh: (refreshToken: string) =>
    `${base_url}auth/refresh?refresh_token=${refreshToken}`,
};

const ANALYTICS = {
  overview: `${analytics_url}/overview`,
  monthlyTrends: `${analytics_url}/monthly-trends`,
  recentActivity: `${analytics_url}/recent-activity`,
  loanApplications: `${analytics_url}/loan-applications`,
  userStats: `${analytics_url}/user-stats`,
  topRankLenders: `${analytics_url}/top-ranking-lenders`,
  topRankCreditScores: `${analytics_url}/top-ranking-credit-score`,
};

const CUSTOMER = {
  users: `${user_url}s`,
  userAnalytics: (userId: string) => `${user_url}/${userId}/analytics`,
  userActivitiess: (userId: string) => `${user_url}/${userId}/activity`,
  userDocuments: (userId: string) => `${user_url}/${userId}/documents`,
  updateUserDocuments: (userId: string, docsId: string) =>
    `${user_url}/${userId}/document/${docsId}`,
};

const LOAN = {
  loans: `${loans_url}`,
  loansCount: `${loans_url}/count`,
};

const SPIN = {
  history: `/admin/spin-histories`,
  rewards: `/admin/rewards`,
  createReward: `/admin/reward`,
  rewardByID: (rewardId: string) => `/admin/reward/${rewardId}`,
};

export { base_url, AUTH, ANALYTICS, CUSTOMER, LOAN, SPIN };
