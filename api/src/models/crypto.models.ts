interface IMetrics {
  market_data: { price_usd: Number };
}

export interface ICrypto {
  id: string;
  slug: string;
  symbol: string;
  metrics: IMetrics;
}
