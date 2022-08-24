import axios from 'axios';

export async function getCryptoDetail(id: string) {
  try {
    const res = await axios.get(
      `http://192.168.1.91:8001/cryptos/profile/${id}`,
    );
    return res;
  } catch (error: any) {
    console.log(error);
  }
}
