
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
}

export interface LoanBetaRow {
  id: string;
  amount: string;
  borrower: string;
  loanPeriod: string;
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
  username: string;
  creditScore: number;
  loansTaken: string;
  loansGiven: string;
}

export interface AdminRow {
  id: string;
  name: string;
  username: string;
  phoneNumber: string;
  email: string;
  status: "active" | "suspended";
  dateAdded: string;
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
