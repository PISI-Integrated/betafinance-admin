export interface SideBarItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

export interface Column<T> {
  header: string;
  accessor: keyof T;
}

export interface OverviewHead {
  title: string;
  content: string;
  footer: string;
}

export interface OverviewTableRow {
  holder: {
    id: string;
    icon: string;
    initial: string;
    name: string;
    username: string;
  };
  email: string;
  noOfLoan?: string;
  score?: number;
}

export interface OverviewTable {
  tableName: string;
  rows: OverviewTableRow[];
}

export interface OverviewItems {
  overviewHead: OverviewHead[];
  overviewTables: OverviewTable[];
  chartData: {
    labels: string[];
    values: number[];
  };
}

export interface LoanData {
  loanHead: Array<{
    title: string;
    content: string;
    footer: string;
  }>;
  loanTableHead: {
    p2p: Array<{
      header: string;
      accessor: keyof LoanP2PRow;
    }>;
    betaLoans: Array<{
      header: string;
      accessor: keyof LoanBetaRow;
    }>;
  };
  loanTableBody: {
    p2p: LoanP2PRow[];
    betaLoans: LoanBetaRow[];
  };
}

export interface LoanP2PRow {
  id: string;
  amount: string;
  type?: string;
  interest?: string;
  lender?: string;
  borrower: string;
  loanPeriod: string;
  date: string;
  status: React.ReactNode;
}

export interface LoanBetaRow {
  id: string;
  amount: string;
  borrower: string;
  loanPeriod: string;
  date: string;
  status: React.ReactNode;
}

export interface CustomerData {
  customerTableHead: {
    p2p: Array<{
      header: string;
      accessor: keyof CustomerRow;
    }>;
    betaLoans: Array<{
      header: string;
      accessor: keyof CustomerRow;
    }>;
  };
  customerTableBody: {
    p2p: CustomerRow[];
    betaLoans: CustomerRow[];
  };
}

export interface CustomerRow {
  id: string;
  name: string;
  dateJoined: string;
  username: string;
  status: "active" | "suspended";
  accountNumber: string;
  creditScore: number;
  totalAmountBorrowed: number;
  highestAmountBorrowed: number;
  numberOfLoansCollected: number;
  lengthOfCreditHistory: number;
  longestLoanPeriod: string;
  shortestLoanPeriod: string;
  totalAmountLent: number;
  highestAmountLent: number;
  numberOfLoansGiven: number;
  longestLendingPeriod: string;
  shortestLendingPeriod: string;
}

export interface AdminRow {
  id: string;
  name: string;
  username: string;
  phoneNumber: string;
  email: string;
  status: "active" | "inactive" | "suspended";
  dateAdded: string;
  dateJoined: string;
  role: string;
}

export interface AdminData {
  adminTableHead: Array<{
    header: string;
    accessor: keyof AdminRow;
  }>;
  adminTableBody: AdminRow[];
}

export interface UserDetails {
  phoneNumber: string;
  dateJoined: string;
  highestAmountLent: string;
  loansGiven: number;
  longestLendingPeriod: string;
  shortestLendingPeriod: string;
  totalAmountBorrowed: string;
  highestAmountBorrowed: string;
  loansCollected: number;
  creditHistoryLength: string;
  longestLoanPeriod: string;
  shortestLoanPeriod: string;
  creditScore: number;
}

export interface MarketerRow {
  id: string;
  totalRevenue: number;
  totalCustomers: number;
  activeCustomers: number;
  monthlyCustomers: number;
  username: string;
  name: string;
  isActive: boolean;
}

export interface MarketerData {
  marketerTableHead: Array<{
    header: string;
    accessor: keyof MarketerRow;
  }>;
  marketerTableBody: MarketerRow[];
}
