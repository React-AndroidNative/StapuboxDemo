import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { COLORS, FONTS } from './../../constants/index';
import CustomDropdown from './../../components/CustomDropdown';
import CustomInput from './../../components/CustomInput';
import CustomButton from './../../components/CustomButton';
import { sendOtp } from '../../network/auth';

const countryData = [
  { value: '+90', label: '+90' },
  { value: '+91', label: '+91' },
  { value: '+92', label: '+92' },
];

const Login = ({ navigation }) => {
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (loading) return;
    setLoading(true);
    const data = {
      mobile: mobile,
    };
    sendOtp(data, successCallback, failureCallback, errorCallback);
  };

  const successCallback = response => {
    console.log('Login Success: ', JSON.stringify(response));
    // {"status":"success","msg":"OTP processed successfully","err":null,"data":[{"message":"OTP sent successfully","expirySeconds":null,"sessionId":19487,"mobile":"8827915701","channel":"SMS","channelValue":"8827915701","otpSent":true,"expiryTime":"2026-06-19T16:50:46.403025786","retryCount":0,"new_profile":null}]}
    alert(response?.data[0]?.message);
    setLoading(false);
    navigation.navigate('OTP', {
      mobile: mobile,
    });
  };
  const failureCallback = response => {
    setLoading(false);
    console.log('Login Failure: ', JSON.stringify(response));
    alert(response?.data[0]?.message || response?.title || response?.msg);
  };
  const errorCallback = error => {
    setLoading(false);
    console.log('Login Error: ', JSON.stringify(error));
    alert(error?.message || error?.title);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login to Your Account</Text>
      <View style={styles.inputContainer}>
        <CustomDropdown
          width={80}
          onChange={val => setCountryCode(val)}
          value={countryCode}
          data={countryData}
        />
        <CustomInput
          containerStyle={styles.input}
          height={50}
          placeholder="9999999999"
          keyBoardType="phone-pad"
          maxLength={10}
          onChangeText={value => setMobile(value)}
          value={mobile}
        />
      </View>
      <CustomButton
        title="Send OTP"
        disabled={mobile.length < 10}
        onPress={handleSendOTP}
        loading={loading}
      />

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <Text
          style={styles.footerTextBlue}
          onPress={() => {
            Alert.alert('Create Account', 'Coming Soon!');
          }}
        >
          Create Account
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 22,
  },
  input: {
    width: '76%',
  },
  text: {
    fontSize: 20,
    fontFamily: FONTS.semibold,
    color: COLORS.white,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
    gap: 10,
    width: '100%',
  },
  footerContainer: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 12,
    fontFamily: FONTS.semibold,
    color: COLORS.white,
    textAlign: 'center',
  },
  footerTextBlue: {
    fontSize: 12,
    fontFamily: FONTS.semibold,
    color: COLORS.primary,
    textAlign: 'center',
  },
});
