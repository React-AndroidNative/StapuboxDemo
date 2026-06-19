import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { COLORS, FONTS } from './../../constants/index';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomDropdown from '../../components/CustomDropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const playingStatusData = [
  { value: 'Looking for Playground', label: 'Looking for Playground' },
  { value: 'Looking for Player', label: 'Looking for Player' },
];

const sportsNameData = [
  { value: 'Archery', label: 'Archery' },
  { value: 'Badminton', label: 'Badminton' },
  { value: 'Basketball', label: 'Basketball' },
  { value: 'Boxing', label: 'Boxing' },
  { value: 'Cricket', label: 'Cricket' },
];
const Details = ({ navigation }) => {
  const [screenOne, setScreenOne] = useState(true);
  const [name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [pincode, setPincode] = useState('');
  const [playingStatus, setPlayingStatus] = useState('');
  const [sportsName, setSportsName] = useState('');

  const getDataFromAsyncStorage = async () => {
    let userDetails = await AsyncStorage.getItem('userDetails');
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
      if (userDetails.name) {
        setName(userDetails.name);
      }
      if (userDetails.address1) {
        setAddress1(userDetails.address1);
      }
      if (userDetails.address2) {
        setAddress2(userDetails.address2);
      }
      if (userDetails.pincode) {
        setPincode(userDetails.pincode);
      }
      if (userDetails.playingStatus) {
        setPlayingStatus(userDetails.playingStatus);
      }
      if (userDetails.sportsName) {
        setSportsName(userDetails.sportsName);
      }
    }
  };
  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  const onBackPress = () => {
    setScreenOne(true);
  };

  const saveToAsyncStorage = async () => {
    const data = {
      name,
      address1,
      address2,
      pincode,
      playingStatus,
      sportsName,
    };
    await AsyncStorage.setItem('userDetails', JSON.stringify(data));
    navigation.navigate('Feedback', { userData: data });
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.headerContainer,
          {
            justifyContent: screenOne ? 'center' : 'space-between',
          },
        ]}
      >
        {!screenOne && (
          <TouchableOpacity onPress={onBackPress} style={styles.iconContainer}>
            <MaterialIcons
              name="arrow-back-ios"
              style={styles.icon}
              size={15}
              color={COLORS.white}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Enter Your Details</Text>

        {!screenOne && (
          <MaterialIcons
            style={[styles.icon, { opacity: 0 }]}
            name="arrow-drop-down"
            size={30}
            color={COLORS.white}
          />
        )}
      </View>
      {screenOne ? (
        <View
          style={{
            flex: 1,
          }}
        >
          <CustomInput
            label="Name*"
            marginTop={20}
            height={50}
            placeholder="Andrej Karapathy"
            onChangeText={value => setName(value)}
            value={name}
          />

          <CustomInput
            label="Address*"
            marginTop={20}
            height={50}
            maxLength={150}
            placeholder="Address Line 1"
            onChangeText={value => setAddress1(value)}
            value={address1}
          />

          <CustomInput
            height={50}
            marginTop={5}
            placeholder="Address Line 2 (Optional)"
            maxLength={150}
            onChangeText={value => setAddress2(value)}
            value={address2}
          />

          <CustomInput
            label="Pin Code*"
            height={50}
            marginTop={20}
            placeholder="110224"
            keyBoardType="phone-pad"
            maxLength={6}
            onChangeText={value => setPincode(value)}
            value={pincode}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <CustomDropdown
            label="Playing Status"
            placeholder="Looking for Playground"
            marginTop={20}
            onChange={val => setPlayingStatus(val)}
            value={playingStatus}
            data={playingStatusData}
          />
          <CustomDropdown
            label="Sports you like *"
            marginTop={100}
            placeholder="Badminton"
            onChange={val => setSportsName(val)}
            value={sportsName}
            data={sportsNameData}
          />
        </View>
      )}

      <CustomButton
        title={'Next'}
        disabled={!name || !address1 || !pincode}
        onPress={() => {
          if (!screenOne) {
            if (!playingStatus || !sportsName) {
              alert('Please select playing status and sports name');
              return;
            }
            saveToAsyncStorage();
          } else {
            setScreenOne(!screenOne);
          }
        }}
      />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: FONTS.semibold,
    color: COLORS.white,
    textAlign: 'center',
  },
  iconContainer: {
    backgroundColor: COLORS.light_border_color,
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    paddingStart: 5,
  },
});
