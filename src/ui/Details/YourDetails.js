import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { COLORS, FONTS } from './../../constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const YourDetails = ({ navigation }) => {
  const [userData, setUserData] = useState({});
  const getDataFromAsyncStorage = async () => {
    let userDetails = await AsyncStorage.getItem('userDetails');
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
      setUserData(userDetails);
    }
  };
  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  const logoutPress = () => {
    Alert.alert('Logout!', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.clear();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Splash' }],
          });
        },
      },
    ]);
  };

  const renderDetails = ({ label, value }) => {
    return (
      <View style={styles.detailContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer]}>
        <Text style={styles.headerTitle}>Your Details</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
        }}
      >
        {renderDetails({ label: 'Name', value: userData?.name })}
        {renderDetails({ label: 'Address 1', value: userData?.address1 })}
        {userData?.address2 &&
          renderDetails({
            label: 'Address 2 (Optional)',
            value: userData?.address2,
          })}
        {renderDetails({ label: 'Pin Code', value: userData?.pincode })}
        {renderDetails({
          label: 'Playing Status',
          value: userData?.playingStatus,
        })}
        {renderDetails({
          label: 'Sports you like',
          value: userData?.sportsName,
        })}
        {renderDetails({ label: 'Feedback', value: userData?.feedback })}
      </ScrollView>

      <CustomButton
        title={'Logout'}
        onPress={logoutPress}
        buttonStyle={{
          backgroundColor: 'red',
        }}
      />
    </View>
  );
};

export default YourDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 25,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: FONTS.semibold,
    color: COLORS.white,
    textAlign: 'center',
  },

  detailContainer: {
    paddingVertical: 15,
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.semibold,
    color: COLORS.white,
  },
  value: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.white,
  },
});
