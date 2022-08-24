import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {getCryptoDetail} from '../api/crypto.api';
import {CryptoDetails} from '../models/crypto';

export const DetailsScreen = ({route}: {route: any}) => {
  const id = route.params.id;

  useEffect(() => {
    Promise.all([
      getCryptoDetail(id),
      // axios.get(`${API_URL}/cryptos/profile/${id}`),
    ]).then(([resMarketData, resProfile]) => {
      // setCryptoMarketData(resMarketData.data);
      // setCryptoProfile(resProfile.data);
      // setCryptoDataLoaded(true);
    });
  }, []);

  // if (!cryptoDetails) return <Text>Loading...</Text>;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{id}</Text>
    </View>
  );
};
