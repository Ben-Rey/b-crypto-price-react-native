import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {getCryptoDetail, getCryptoMarketData} from '../api/crypto.api';
import {CryptoProfileInit, CryptoMarketDataInit} from '../models/crypto';
// import {CryptoDetails} from '../models/crypto';
import RenderHtml from 'react-native-render-html';

export const DetailsScreen = ({route}: {route: any}) => {
  const {width} = useWindowDimensions();

  const id = route.params.id;
  const [cryptoProfile, setCryptoProfile] = useState(CryptoProfileInit);
  const [cryptoMarketData, setCryptoMarketData] =
    useState(CryptoMarketDataInit);
  const [cryptoDataLoaded, setCryptoDataLoaded] = useState(false);

  useEffect(() => {
    Promise.all([getCryptoDetail(id), getCryptoMarketData(id)]).then(
      ([resProfile, resMarketData]) => {
        setCryptoProfile(resProfile?.data);
        setCryptoMarketData(resMarketData?.data);
        setCryptoDataLoaded(true);
      },
    );
  }, [id]);

  // if (!cryptoDetails) return <Text>Loading...</Text>;
  return (
    <>
      {cryptoDataLoaded && (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>{cryptoProfile.name}</Text>
              <Text style={styles.symbol}>{cryptoProfile.symbol}</Text>
              <Text style={styles.price}>
                {`$ ${convert(cryptoMarketData.market_data.price_usd)}`}
              </Text>
            </View>
            <View style={styles.headerTagLine}>
              <Text style={styles.line}>{cryptoProfile.tagline}</Text>
            </View>
          </View>
          <View style={styles.priceChanges}>
            <View style={styles.priceChangeRow}>
              <Text style={styles.line}>Percent Change 1h</Text>
              <Text style={styles.line}>
                {` % ${convert(
                  cryptoMarketData.market_data.percent_change_usd_last_1_hour,
                )}`}
              </Text>
            </View>
            <View style={styles.priceChangeRow}>
              <Text style={styles.line}>Percent Change 24h</Text>
              <Text style={styles.line}>
                {` % ${convert(
                  cryptoMarketData.market_data.percent_change_usd_last_24_hours,
                )}`}
              </Text>
            </View>
          </View>
          <ScrollView style={styles.cryptoInfo}>
            <View style={styles.cryptoInfoRow}>
              <Text style={styles.cryptoInfoTitle}>Overview</Text>
              <RenderHtml
                contentWidth={width}
                source={{
                  html: `<p style="color: #fff">${cryptoProfile.overview}</p>`,
                }}
              />
            </View>
            <View style={styles.cryptoInfoRow}>
              <Text style={styles.cryptoInfoTitle}>Background</Text>

              <RenderHtml
                contentWidth={width}
                source={{
                  html: `<p style="color: #fff">${cryptoProfile.background}</p>`,
                }}
              />
            </View>
          </ScrollView>
        </View>
      )}

      {!cryptoDataLoaded && <ActivityIndicator size="large" color="#ffab00" />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272d42',
    padding: 10,
    flex: 1,
  },

  header: {
    backgroundColor: '#000',
    height: 100,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },

  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTagLine: {
    marginTop: 10,
  },

  name: {
    fontSize: 24,
    color: '#fff',
  },

  symbol: {
    fontSize: 15,
    padding: 5,
    backgroundColor: '#272d42',
    color: '#fff',
  },

  price: {
    fontSize: 28,
    color: '#ffab00',
    width: 150,
    textAlign: 'right',
  },

  line: {
    color: '#fff',
    fontSize: 16,
  },
  priceChanges: {
    backgroundColor: '#000',
    height: 70,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  priceChangeRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cryptoInfo: {
    backgroundColor: '#000',
    padding: 10,
    flex: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  cryptoInfoTitle: {
    color: '#ffab00',
    fontSize: 22,
    marginBottom: 5,
  },
  cryptoInfoRow: {
    flex: 1,
    marginBottom: 25,
  },
});

const convert = (price: number) => {
  return Math.round(price * 100) / 100;
};
