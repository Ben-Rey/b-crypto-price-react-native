import React from 'react';
import {Text, View} from 'react-native';
import {CryptoDetails} from '../models/crypto';

export const DetailsScreen = ({
  cryptoDetails,
}: {
  cryptoDetails: CryptoDetails;
}) => {
  console.log(cryptoDetails);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
};
