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

  describe('When updating from focused to unfocused', () => {
    it("changes the childrenWrapper's height", () => {
      const {
        wrapper: { getByTestId, update },
      } = setup({ focused: true });

      const { element: updatedElement } = setup({ focused: false });
      update(updatedElement);

      expect(getByTestId('childrenWrapper').props.style).toMatchObject({
        height: 0,
        opacity: 0,
      });
    });
  });

  describe('When updating from unfocused to focused', () => {
    it("changes the childrenWrapper's height", () => {
      const {
        wrapper: { getByTestId, update },
      } = setup({ focused: false });

      const { element: updatedElement } = setup({ focused: true });
      update(updatedElement);

      expect(getByTestId('childrenWrapper').props.style).toMatchObject({
        height: '100%',
        opacity: 1,
      });
    });
  });

  describe('onFocus', () => {
    it('calls onFocus when pressing on Subheader with the current backdrop status', () => {
      const mockOnFocus = jest.fn();
      const {
        wrapper: { getByTestId },
      } = setup({ focused: false, onFocus: mockOnFocus });

      fireEvent.press(getByTestId('subheader'));

      expect(mockOnFocus).toHaveBeenCalledWith(false);
    });

    it("calls onFocus when pressing on Subheader's icon", () => {
      const mockOnFocus = jest.fn();
      const {
        wrapper: { getByTestId },
      } = setup({ focused: false, onFocus: mockOnFocus, icon: <View /> });

      fireEvent.press(getByTestId('icon'));

      expect(mockOnFocus).toHaveBeenCalledWith(false);
    });
  });
});
