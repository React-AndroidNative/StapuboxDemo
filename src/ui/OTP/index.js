import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from './../../constants/index';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { OtpInput } from 'react-native-otp-entry';
import CustomButton from '../../components/CustomButton';
import { resendOtp, verifyOtp } from '../../network/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTP = ({ navigation, route }) => {
  const [otp, setOTP] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [resendClicked, setResendClicked] = useState(false);
  const [wrongOtp, setWrongOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    startResendTimer();
  }, []);
  const startResendTimer = () => {
    setResendClicked(true);
    const interval = setInterval(() => {
      setResendTimer(prev => {
        if (prev === 0) {
          clearInterval(interval);
          setResendClicked(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return interval;
  };

  const mobile = route?.params?.mobile;
  const onBackPress = () => {
    Alert.alert('Go back!', 'Are you sure you want to go back?', [
      {
        text: 'Yes',
        onPress: () => navigation.goBack(),
      },
      {
        text: 'No',
        onPress: () => null,
      },
    ]);
  };
  const handleVerifyOTP = () => {
    setLoading(true);
    const data = {
      mobile: mobile,
      otp: otp,
    };
    verifyOtp(
      data,
      successVerifyCallback,
      failureVerifyCallback,
      errorVerifyCallback,
    );
  };

  const successVerifyCallback = async response => {
    console.log('Verify OTP Success: ', JSON.stringify(response));
    await AsyncStorage.setItem('userLogin', 'true');
    alert(response?.msg);
    setLoading(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Details' }],
    });
  };
  const failureVerifyCallback = response => {
    console.log('Verify OTP Failure: ', JSON.stringify(response));
    setLoading(false);
    alert(response?.data[0]?.message || response?.title || response?.msg);
    setWrongOtp(true);
  };
  const errorVerifyCallback = error => {
    console.log('Verify Error: ', JSON.stringify(error));
    setLoading(false);
    setWrongOtp(true);
  };

  const handleResendOTP = () => {
    startResendTimer();
    const data = {
      mobile: mobile,
    };
    resendOtp(data, successCallback, failureCallback, errorCallback);
  };

  const successCallback = response => {
    console.log('Resend OTP Success: ', JSON.stringify(response));
    alert(response?.data[0]?.message);
  };
  const failureCallback = response => {
    console.log('Resend OTP Failure: ', JSON.stringify(response));
    alert(response?.data[0]?.message || response?.title || response?.msg);
  };
  const errorCallback = error => {
    console.log('Resend Error: ', JSON.stringify(error));
    alert(error?.message || error?.title);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBackPress} style={styles.iconContainer}>
          <MaterialIcons
            name="arrow-back-ios"
            style={styles.icon}
            size={15}
            color={COLORS.white}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Phone Verification </Text>
        <MaterialIcons
          style={[styles.icon, { opacity: 0 }]}
          name="arrow-drop-down"
          size={30}
          color={COLORS.white}
        />
      </View>
      <Text style={styles.text}>
        Enter 4 digit OTP sent to your phone number
      </Text>
      <OtpInput
        numberOfDigits={4}
        focusColor={COLORS.primary}
        blurOnFilled={true}
        onFilled={text => {
          setOTP(text);
        }}
        onTextChange={() => {
          setWrongOtp(false);
        }}
        theme={{
          containerStyle: styles.otpContainerStyle,
          pinCodeTextStyle: styles.pinCodeText,
          pinCodeContainerStyle: styles.pinCodeContainer,
        }}
      />
      {wrongOtp && <Text style={styles.errorMsg}>Wrong Otp Entered</Text>}
      {resendClicked && resendTimer > 0 ? (
        <Text style={styles.resendOTP}>
          Resend OTP in{' '}
          {resendTimer > 9 ? `00:${resendTimer}` : `00:0${resendTimer}`}
        </Text>
      ) : (
        <Text style={styles.resendOTP} onPress={handleResendOTP}>
          Resend OTP
        </Text>
      )}

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Verify OTP"
          disabled={otp.length < 4}
          onPress={handleVerifyOTP}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 25,
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
  headerTitle: {
    fontSize: 16,
    fontFamily: FONTS.semibold,
    color: COLORS.white,
  },
  text: {
    fontSize: 20,
    fontFamily: FONTS.semibold,
    color: COLORS.white,
    marginTop: 30,
  },
  errorMsg: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: 'red',
    marginTop: 5,
    marginBottom: 10,
  },
  resendOTP: {
    fontSize: 14,
    fontFamily: FONTS.semibold,
    color: COLORS.primary,
    marginTop: 20,
  },
  buttonContainer: {
    marginVertical: 30,
  },
  otpContainerStyle: {
    marginTop: 30,
    justifyContent: 'flex-start',
  },
  pinCodeContainer: {
    marginEnd: 10,
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  pinCodeText: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
    fontSize: 20,
  },
});
