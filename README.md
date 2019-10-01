# react-native-material-backdrop-modal
Material Design "Backdrop" component for Android and iOS.

- [Setup](#setup)
- [Usage](#usage)
- [Props](#props)

## Setup
1. Install:
    - Using [npm](https://www.npmjs.com/#getting-started): `npm install react-native-material-backdrop-modal --save`
    - Using [Yarn](https://yarnpkg.com/): `yarn add react-native-material-backdrop-modal`

2. Import it in your JS:
    ```js
    import Backdrop from 'react-native-material-backdrop-modal';
    ```

## Usage
// TODO: Add example

## Props
| prop                      | default                  | type          | description                                                                                                                                                     |
| ------------------------- | ------------------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children                  |                  | node        | Content of `Backdrop     `                                                                                                                                       |
| focused            | true                     | boolean        | Specifies whether `Backdrop` should be focused                                                                                                                                        |
| onFocus           |                      | Function        | The Handler that's emitted every time the user conceals the back layer.                                                                                                                          |
| title         |  | string        | The Subheader title                                                                                                                             |
| icon | | element | Icon to be used on the Subheader
