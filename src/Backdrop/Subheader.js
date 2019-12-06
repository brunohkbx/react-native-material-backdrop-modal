import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';

const AnimatedTouchable = Animated.createAnimatedComponent(Touchable);

const Subheader = ({ disabled, onPress, icon, iconContainerStyle, title }) => {
  return (
    <Touchable
      disabled={disabled}
      onPress={onPress}
      background={Touchable.Ripple('rgba(0, 0, 0, 0.2)', true)}
      style={{ height: 48 }}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        {icon && (
          <AnimatedTouchable
            onPress={onPress}
            centered
            style={[styles.icon, iconContainerStyle]}
            background={Touchable.Ripple('rgba(0, 0, 0, 0.2)', true)}
            testID="icon"
          >
            {icon}
          </AnimatedTouchable>
        )}
      </View>
    </Touchable>
  );
};

Subheader.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.element,
  iconContainerStyle: PropTypes.object,
  title: PropTypes.string.isRequired,
};

Subheader.defaultProps = {
  disabled: false,
  icon: null,
  iconContainerStyle: {},
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
