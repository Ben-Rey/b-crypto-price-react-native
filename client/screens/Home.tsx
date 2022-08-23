import React from 'react';
import {Pressable, Text, View} from 'react-native';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const navigateToDetails = () => {
    navigation.navigate('Details');
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Pressable onPress={navigateToDetails}>
        <Text>Navigate to Details</Text>
      </Pressable>
    </View>
  );
};
