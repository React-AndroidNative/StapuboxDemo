import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { COLORS, FONTS } from '../constants/index';

const CustomDropdown = ({
  width,
  label = '',
  placeholder = 'Select',
  marginTop = 0,
  data,
  value,
  onChange,
}) => {
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={{ marginTop: marginTop }}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Dropdown
        style={[styles.dropdown, { width: width }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        containerStyle={styles.containerStyle}
        itemContainerStyle={styles.itemContainerStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          onChange(item.value);
        }}
        renderItem={renderItem}
        renderRightIcon={() => (
          <MaterialIcons
            style={styles.icon}
            name="arrow-drop-down"
            size={25}
            color={COLORS.white}
          />
        )}
      />
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderRadius: 12,
    borderColor: COLORS.light_border_color,
    borderWidth: 1,
    padding: 5,
  },
  containerStyle: {
    borderRadius: 10,
    paddingVertical: 8,
  },
  itemContainerStyle: {
    borderRadius: 10,
  },
  label: {
    color: COLORS.text,
    fontFamily: FONTS.semibold,
    marginBottom: 5,
    fontSize: 14,
  },
  item: {
    marginHorizontal: 15,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E3E3E3',
  },
  textItem: {
    fontSize: 16,
    color: COLORS.black,
  },
  placeholderStyle: {
    color: COLORS.placeholder_color,
    fontSize: 16,
    paddingStart: 10,
  },
  selectedTextStyle: {
    color: COLORS.text,
    fontSize: 16,
    paddingStart: 10,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  icon: {
    marginLeft: 5,
  },
});
