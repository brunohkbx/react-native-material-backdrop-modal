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

const Backdrop = ({ children, focused, onFocus, title, icon }) => {
  const [contentVisibility, setContentVisibility] = useState({
    revealed: !focused,
    height: focused ? '100%' : 0,
    opacity: focused ? 1 : 0,
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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (focused) {
      setContentVisibility({
        revealed: false,
        height: '100%',
        opacity: 1,
      });
    } else {
      setContentVisibility({
        revealed: true,
        height: 0,
        opacity: 0,
      });
    }
  }, [focused]);

  return (
    <View style={styles.overlay}>
      <View style={styles.backdrop}>
        <Subheader
          disabled={focused}
          onPress={() => onFocus(focused)}
          icon={icon}
          title={title}
          testID="subheader"
        />
        <View
          style={{
            height: contentVisibility.height,
            opacity: contentVisibility.opacity,
          }}
          testID="childrenWrapper"
        >
          <View style={[styles.children]}>{children}</View>
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
};

Backdrop.defaultProps = {
  children: null,
  focused: true,
  icon: null,
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
    maxHeight: '100%',
  },
  children: {
    marginHorizontal: 16,
    paddingVertical: 12,
  },
});

export default Backdrop;
