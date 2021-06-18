export interface IWalletHistoryDisplayData {
    amount: number;
    paymentOperator: string;
    operationName: string;
    date: string;
    status: string;
  }
  
  export interface IWalletHistory {
    amount: number;
    info: any;
    operationType: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    displayData: IWalletHistoryDisplayData;
  }
  export interface IWallet {
    balance: number;
    history: IWalletHistory[];
  }
  
  export interface IWalletResponse {
    wallet: IWallet;
  }
  
  export interface IWalletHistoryResponse {
    history: IWalletHistory[];
    pagination: {
      totalCount: number;
      page: number;
      count: number;
    };
  }
  
  export interface IWalletSettingsResponse {
    dwolla: {
      account: number;
    };
  }
  