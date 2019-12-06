import React from 'react';
import { View, Text } from 'react-native';
import { fireEvent, render } from 'react-native-testing-library';
import Backdrop from '../Backdrop';

jest.mock('react-native-reanimated', () =>
  // eslint-disable-next-line global-require
  require('react-native-reanimated/mock')
);

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

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
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
