import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS, FONTS } from './../../constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {
  const isUserLogin = async () => {
    let userLogin = await AsyncStorage.getItem('userLogin');
    if (userLogin) {
      let userDetails = await AsyncStorage.getItem('userDetails');
      if (userDetails) {
        navigation.replace('YourDetails');
      } else {
        navigation.replace('Details');
      }
    } else {
      navigation.replace('Login');
    }
  };
  useEffect(() => {
    setTimeout(() => {
      isUserLogin();
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>StapuBox Demo</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  text: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
});
