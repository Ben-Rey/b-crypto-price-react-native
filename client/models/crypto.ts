export interface Crypto {
  id: string;
  name: string;
  price: number;
}

export interface CryptoDetails {
  Asset: {
    id: string;
    serial_id: number;
    symbol: string;
    name: string;
    slug: string;
    contract_addresses: string;
    _internal_temp_agora_id: string;
  };
  market_data: {
    price_usd: number;
    price_btc: number;
    price_eth: number;
    volume_last_24_hours: number;
    real_volume_last_24_hours: number;
    volume_last_24_hours_overstatement_multiple: number;
    percent_change_usd_last_24_hours: number;
    percent_change_btc_last_24_hours: number;
    percent_change_eth_last_24_hours: number;
    last_trade_at: string;
  };
}
