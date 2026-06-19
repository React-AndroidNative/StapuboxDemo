import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { COLORS, FONTS } from './../../constants/index';

const Feedback = ({ navigation, route }) => {
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const onBackPress = () => {
    navigation.goBack();
  };

  const saveToAsyncStorage = async () => {
    const data = {
      ...route.params.userData,
      feedback: feedbackMsg,
    };
    await AsyncStorage.setItem('userDetails', JSON.stringify(data));
    navigation.replace('YourDetails');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer]}>
        <TouchableOpacity onPress={onBackPress} style={styles.iconContainer}>
          <MaterialIcons
            name="arrow-back-ios"
            style={styles.icon}
            size={15}
            color={COLORS.white}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Share Your Feedback</Text>

        <MaterialIcons
          style={[styles.icon, { opacity: 0 }]}
          name="arrow-drop-down"
          size={30}
          color={COLORS.white}
        />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <CustomInput
          label="Feedback"
          marginTop={20}
          height={200}
          showLimit={true}
          maxLength={1000}
          placeholder="Write your suggestion"
          onChangeText={value => setFeedbackMsg(value)}
          value={feedbackMsg}
        />
      </View>

      <CustomButton
        title={'Next'}
        disabled={!feedbackMsg}
        onPress={saveToAsyncStorage}
      />
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
