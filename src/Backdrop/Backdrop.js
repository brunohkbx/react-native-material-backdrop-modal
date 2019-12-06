import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useLayout } from 'react-native-hooks';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';
import Animated, { Easing } from 'react-native-reanimated';
import Subheader from './Subheader';

const SUBHEADER_HEIGHT = 48;

const {
  Clock,
  Value,
  block,
  cond,
  clockRunning,
  set,
  startClock,
  timing,
  stopClock,
  interpolate,
  concat,
} = Animated;

const runTiming = ({ toValue, position = new Value(0), duration = 300 }) => {
  const clock = new Clock();

  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position,
    time: new Value(0),
  };

  const config = { toValue, duration, easing: Easing.inOut(Easing.ease) };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(config.toValue, toValue),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ]);
};

const Backdrop = ({ children, focused, onFocus, title, icon }) => {
  const { onLayout: onLayoutOverlay, height: overlayHeight } = useLayout();
  const revealedPosition = overlayHeight - SUBHEADER_HEIGHT;

  const baseValue = useRef(
    focused ? new Value(revealedPosition) : new Value(0)
  );

  useUpdateEffect(() => {
    baseValue.current = runTiming({
      toValue: new Value(focused ? revealedPosition : 0),
      position: new Value(focused ? 0 : revealedPosition),
    });
  }, [focused]);

  const opacityIcon = interpolate(baseValue.current, {
    inputRange: [-SUBHEADER_HEIGHT, 0, Math.abs(revealedPosition)],
    outputRange: [0, 1, 0],
  });

  const childrenHeight = concat(
    interpolate(baseValue.current, {
      inputRange: [-SUBHEADER_HEIGHT, 0, Math.abs(revealedPosition)],
      outputRange: [100, 0, 100],
    }),
    '%'
  );

  return (
    <View style={[styles.overlay]} onLayout={onLayoutOverlay}>
      <View style={[styles.backdrop]}>
        <Subheader
          disabled={focused}
          onPress={onFocus}
          icon={icon}
          iconContainerStyle={{ opacity: opacityIcon }}
          title={title}
          testID="subheader"
        />
        <Animated.View style={{ height: childrenHeight }}>
          <View style={styles.children}>{children}</View>
        </Animated.View>
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
    maxHeight: '100%',
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
