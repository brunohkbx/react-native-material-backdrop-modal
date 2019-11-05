import React from 'react';
import { View, Text } from 'react-native';
import { fireEvent, render } from 'react-native-testing-library';
import Backdrop from '../Backdrop';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/Libraries/LayoutAnimation/LayoutAnimation');

describe('Backdrop', () => {
  const setup = (propOverrides = {}) => {
    const defaultProps = {
      onFocus: jest.fn(),
      title: 'Movies',
      ...propOverrides,
    };

    const element = (
      <Backdrop {...defaultProps}>
        <View>
          <Text>Movie 1</Text>
        </View>
      </Backdrop>
    );

    const wrapper = render(element);

    return { element, wrapper };
  };

  beforeAll(() => jest.useFakeTimers());

  describe('When updating from focused to unfocused', () => {
    it('does not renders its children anymore', () => {
      const {
        wrapper: { getByTestId, update },
      } = setup({ focused: true });
      expect(getByTestId('children')).toBeDefined();

      const { element: updatedElement } = setup({ focused: false });
      update(updatedElement);
      jest.runAllTimers();

      expect(() => getByTestId('children')).toThrow();
    });
  });

  describe('When updating from unfocused to focused', () => {
    it('properly renders with its children', () => {
      const {
        wrapper: { getByTestId, update },
      } = setup({ focused: false });
      expect(() => getByTestId('children')).toThrow();

      const { element: updatedElement } = setup({ focused: true });
      update(updatedElement);
      jest.runAllTimers();

      expect(getByTestId('children')).toBeDefined();
    });
  });

  describe('onFocus', () => {
    it('calls onFocus when pressing on Subheader', () => {
      const mockOnFocus = jest.fn();
      const {
        wrapper: { getByTestId },
      } = setup({ focused: false, onFocus: mockOnFocus });

      fireEvent.press(getByTestId('subheader'));

      expect(mockOnFocus).toHaveBeenCalled();
    });

    it("calls onFocus when pressing on Subheader's icon", () => {
      const mockOnFocus = jest.fn();
      const {
        wrapper: { getByTestId },
      } = setup({ focused: false, onFocus: mockOnFocus, icon: <View /> });

      fireEvent.press(getByTestId('icon'));

      expect(mockOnFocus).toHaveBeenCalled();
    });
  });
});
