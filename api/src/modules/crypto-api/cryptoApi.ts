import axios from "axios";
import { ICrypto } from "../../models/crypto.models";

export async function getPrice() {
  try {
    const result = await axios.get(
      `${process.env.MESSARI_URL}assets?fields=id,slug,symbol,metrics/market_data/price_usd`,
      {
        headers: {
          "x-messari-api-key": process.env.MESSARI_API_KEY!,
        },
      }
    );

    return result.data.data.map((item: ICrypto) => ({
      id: item.id,
      name: item.slug,
      symbol: item.symbol,
      price: item.metrics.market_data.price_usd,
    }));
  } catch (error) {
    console.log(error);
  }
}

export async function getCryptoDetails(assetKey: string) {
  try {
    const result = await axios.get(
      `${process.env.MESSARI_URL}assets/${assetKey}/metrics/market-data`,
      {
        headers: {
          "x-messari-api-key": process.env.MESSARI_API_KEY!,
        },
      }
    );
    console.log(result.data.data);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
}
