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
    alignItems: focused ? 'stretch' : 'flex-end',
    displayChildren: focused,
    concealed: !focused,
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
        alignItems: 'stretch',
        displayChildren: true,
        concealed: false,
      });
    } else {
      setContentVisibility({
        alignItems: 'flex-end',
        displayChildren: false,
        concealed: true,
      });
    }
  }, [focused]);

  return (
    <View style={[styles.modal, { alignItems: contentVisibility.alignItems }]}>
      <View style={styles.backdrop}>
        <Subheader
          disabled={focused}
          onPress={onFocus}
          icon={icon}
          showIcon={contentVisibility.concealed}
          title={title}
          testID="subheader"
        />
        {children && contentVisibility.displayChildren && (
          <View style={styles.contentContainer} testID="children">
            {children}
          </View>
        )}
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
  modal: {
    flex: 1,
    flexDirection: 'row',
    ...StyleSheet.absoluteFill,
  },
  backdrop: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  contentContainer: {
    marginHorizontal: 16,
    paddingVertical: 12,
  },
});

export default Backdrop;
