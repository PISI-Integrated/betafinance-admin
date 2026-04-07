import Icon from "./icons";

export const routes = {
  signup: "/signup",
  signin: "/",
  forgotPassword: "/forgot-password",
  home: "/",
  sidebarItems: [
    {
      title: "Overview",
      path: "/",
      icon: Icon.Overview,
      activeIcon: Icon.OverviewActive,
      alt: "overview",
    },
    {
      title: "Loans",
      path: "/loans",
      icon: Icon.Loan,
      activeIcon: Icon.LoanActive,
      alt: "loans",
    },
    {
      title: "Users",
      path: "/customers",
      icon: Icon.Customer,
      activeIcon: Icon.CustomerActive,
      alt: "customers",
    },
    {
      title: "Marketers",
      path: "/marketers",
      icon: Icon.Marketer,
      activeIcon: Icon.MarketerActive,
      alt: "marketers",
    },
    {
      title: "Spin Game",
      path: "/spin",
      icon: Icon.Spin,
      activeIcon: Icon.SpinActive,
      alt: "spin",
    },
    {
      title: "Transactions",
      path: "/transactions",
      icon: Icon.Transaction,
      activeIcon: Icon.TransactionActive,
      alt: "transactions",
    },
    {
      title: "Admin",
      path: "/admin",
      icon: Icon.Admin,
      activeIcon: Icon.AdminActive,
      alt: "admin",
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Icon.Settings,
      activeIcon: Icon.SettingsActive,
      alt: "settings",
    },
  ],
};
