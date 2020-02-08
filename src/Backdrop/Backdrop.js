import React, { useState, useEffect } from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';
import Subheader from './Subheader';

const Backdrop = ({
  children,
  focused,
  onFocus,
  title,
  icon,
  preset,
  titleStyle,
}) => {
  const [contentVisibility, setContentVisibility] = useState({
    revealed: !focused,
    flex: focused ? 1 : 0,
  });

  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useUpdateEffect(() => {
    LayoutAnimation.configureNext(preset);

    if (focused) {
      setContentVisibility({
        revealed: false,
        flex: 1,
      });
    } else {
      setContentVisibility({
        revealed: true,
        flex: 0,
      });
    }
  }, [focused]);

  return (
    <View style={styles.overlay}>
      <View
        style={[styles.backdrop, { flex: contentVisibility.flex }]}
        testID="backdrop"
      >
        <Subheader
          disabled={focused}
          onPress={onFocus}
          icon={icon}
          title={title}
          titleStyle={titleStyle}
          testID="subheader"
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={styles.children}>{children}</View>
        </View>
      </View>
    </View>
  );
};

Backdrop.propTypes = {
  children: PropTypes.node,
  focused: PropTypes.bool,
  onFocus: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  preset: PropTypes.object,
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Backdrop.defaultProps = {
  children: null,
  focused: true,
  icon: null,
  preset: LayoutAnimation.Presets.easeInEaseOut,
  titleStyle: {},
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
  },
  backdrop: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  children: {
    marginHorizontal: 16,
    paddingVertical: 12,
  },
});

export default Backdrop;
