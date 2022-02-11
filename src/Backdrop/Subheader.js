import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';

const Subheader = ({ disabled, onPress, icon, title, titleStyle, TitleComponent }) => {
  return (
    <Touchable
      disabled={disabled}
      onPress={onPress}
      background={Touchable.Ripple('rgba(0, 0, 0, 0.2)', true)}
      accessibilityState={{ expanded: disabled }}
      accessibilityLabel={title}
      accessibilityRole="button"
    >
      <View style={styles.headerContainer}>
        {TitleComponent ? 
          (<TitleComponent />) : 
          (<Text style={[styles.title, titleStyle]}>{title}</Text>)
        }
        {icon && (
          <Touchable
            onPress={onPress}
            centered
            style={styles.icon}
            background={Touchable.Ripple('rgba(0, 0, 0, 0.2)', true)}
            testID="icon"
            hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
            accessibilityRole="button"
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
  TitleComponent: PropTypes.elementType,
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Subheader.defaultProps = {
  disabled: false,
  icon: null,
  titleStyle: {},
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
