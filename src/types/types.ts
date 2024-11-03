export interface SideBarItem {
  title: string;
  path: string;
  icon: React.ReactNode;
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
      accessor: string;
    }>;
    betaLoans: Array<{
      header: string;
      accessor: string;
    }>;
  };
  loanTableBody: {
    p2p: Array<{
      id: string;
      amount: string;
      type?: string;
      interest?: string;
      lender?: string;
      borrower: string;
      loanPeriod: string;
    }>;
    betaLoans: Array<{
      id: string;
      amount: string;
      borrower: string;
      loanPeriod: string;
    }>;
  };
}

export interface CustomerData {
  customerTableHead: {
    p2p: Array<{
    header: string;
    accessor: String;
    }>;
    betaLoans: Array<{
      header: string;
      accessor: string;
    }>;
  };
  customerTableBody: {
    p2p: Array<{
      id: string;
      name: string;
      username: string;
      creditScore: number;
      loansTaken: string;
      loansGiven: string;
    }>;
    betaLoans: Array<{
      id: string;
      name: string;
      username: string;
      creditScore: number;
      loansTaken: string;
      loansGiven: string;
    }>;
  };
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
