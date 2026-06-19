import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { COLORS, FONTS } from '../constants/index';

const CustomInput = ({
  label = '',
  value,
  onChangeText,
  keyBoardType,
  maxLength,
  placeholder,
  height,
  marginTop,
  containerStyle,
  showLimit = false,
}) => {
  const [focused, setFocused] = useState(false);

  const getBorderColor = () => {
    if (focused) {
      return COLORS.white;
    } else {
      return COLORS.light_border_color;
    }
  };
  return (
    <View
      style={[
        styles.container,
        {
          marginTop: marginTop || 0,
        },
        containerStyle,
      ]}
    >
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          {
            borderColor: getBorderColor(),
            height: height || 48,
            textAlignVertical: height > 50 ? 'top' : 'center',
          },
        ]}
        multiline={height > 50 ? true : false}
        placeholderTextColor={COLORS.placeholder_color}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={keyBoardType}
        maxLength={maxLength}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
      />
      {showLimit && <Text style={styles.limit}>{value?.length || 0}/1000</Text>}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    color: COLORS.text,
    fontFamily: FONTS.semibold,
    marginBottom: 5,
    fontSize: 14,
  },
  limit: {
    color: COLORS.text,
    fontFamily: FONTS.regular,
    marginBottom: 5,
    fontSize: 12,
    textAlign: 'right',
    marginTop: 5,
  },
  input: {
    flexGrow: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.white,
    paddingHorizontal: 10,
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.regular,
  },
});
