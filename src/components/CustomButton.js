import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants/index';

const CustomButton = ({ title, disabled, onPress, buttonStyle, loading }) => {
  return (
    <Button
      title={title}
      disabled={disabled}
      onPress={onPress}
      buttonStyle={[styles.buttonStyle, buttonStyle]}
      titleStyle={styles.titleStyle}
      disabledStyle={styles.disabledStyle}
      loading={loading}
    />
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 50,
  },
  titleStyle: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.semibold,
  },
  disabledStyle: {
    backgroundColor: COLORS.light_border_color,
  },
});
