const base_url = process.env.NEXT_PUBLIC_API_URL!;

const analytics_url = "admin/analytics";
const user_url = "admin/users";

const AUTH = {
  login: "/auth/login",
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

const USER = {
  users: `${user_url}`,
  userAnalytics: (userId: string) => `${user_url}/${userId}/analytics`,
  userActivitiess: (userId: string) => `${user_url}/${userId}/activity`,
};

export { base_url, AUTH, ANALYTICS, USER };
