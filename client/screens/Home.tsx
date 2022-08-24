import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import {Crypto} from '../models/crypto';
import SocketContext from '../context/socket.context';
import {getCryptoDetail} from '../api/crypto.api';

interface HomeScreenProps {
  navigation: any;
}

const Item = ({
  title,
  price,
  onPress,
}: {
  title: string;
  price: number;
  onPress: () => void;
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.item, styles.shadow]}>
      <Text style={styles.itemName}>{title}</Text>
      <Text style={styles.itemPrice}>{price} $</Text>
    </Pressable>
  );
};

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const socket = useContext(SocketContext);
  const [cryptos, setCryptos] = useState(null);

  const navigateToDetails = async (id: string) => {
    console.log(await getCryptoDetail(id));
    navigation.navigate('Details');
  };

  useEffect(() => {
    socket &&
      socket.socket.on('crypto', (res: any) => {
        setCryptos(res);
      });
  }, [socket]);

  const renderItem = ({item}: {item: Crypto}) => (
    <Item
      onPress={() => navigateToDetails(item.id)}
      title={item.name}
      price={item.price}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cryptos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff4d8',
  },
  listContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    width: '100%',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#fed468',
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 25,
    width: '80%',
    marginVertical: 10,
    alignSelf: 'center',
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: '#5b533d',
  },
  itemName: {
    color: '#5b533d',
    fontSize: 24,
  },
  itemPrice: {
    color: '#5b533d',
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 32,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
  },
});
