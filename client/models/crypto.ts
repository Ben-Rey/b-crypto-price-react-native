export interface Crypto {
  id: string;
  name: string;
  price: number;
}

export interface CryptoProfile {
  name: string;
  symbol: string;
  overview: string;
  background: string;
  tagline: string;
}

export const CryptoProfileInit: CryptoProfile = {
  name: '',
  symbol: '',
  tagline: '',
  overview: '',
  background: '',
};

export interface CryptoMarketData {
  market_data: {
    price_usd: number;
    percent_change_usd_last_1_hour: number;
    percent_change_usd_last_24_hours: number;
  };
}

export const CryptoMarketDataInit: CryptoMarketData = {
  market_data: {
    price_usd: 0,
    percent_change_usd_last_1_hour: 0,
    percent_change_usd_last_24_hours: 0,
  },
};
