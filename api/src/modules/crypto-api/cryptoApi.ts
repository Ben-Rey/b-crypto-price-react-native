import axios, { AxiosError } from "axios";
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
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data);
      console.log("--------------------------------");
      console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log("Error", error.message);
    }
    // console.log(error.config);
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
