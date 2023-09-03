export type WalletType = {
  wallet_id: string;
  balance: number;
  currency: CurrencyType;
};

export type CurrencyType = {
  currency_id: string;
  name: string;
  symbol: string;
  code: string;
};
