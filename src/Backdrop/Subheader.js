import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';

const Subheader = ({ disabled, onPress, icon, title }) => {
  return (
    <Touchable
      disabled={disabled}
      onPress={onPress}
      background={Touchable.Ripple('rgba(0, 0, 0, 0.2)', true)}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        {icon && (
          <Touchable
            onPress={onPress}
            centered
            style={styles.icon}
            background={Touchable.Ripple('rgba(0, 0, 0, 0.2)', true)}
            testID="icon"
          >
            {icon}
          </Touchable>
        )}
      </View>
    </Touchable>
  );
};

Subheader.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.element,
  title: PropTypes.string.isRequired,
};

Subheader.defaultProps = {
  disabled: false,
  icon: null,
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    marginHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: 'sans-serif',
  },
  icon: {
    position: 'absolute',
    top: 12,
    right: 16,
    width: 24,
    height: 24,
  },
});

export default Subheader;
