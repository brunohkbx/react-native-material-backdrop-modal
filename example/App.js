import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme } from 'react-native-paper';
import ShopElectronicsScreen from './screens/ShopElectronics';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="ShopElectronics"
        component={ShopElectronicsScreen}
        options={{
          title: 'Shop Electronics',
          headerStyle: {
            backgroundColor: DefaultTheme.colors.primary,
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerTintColor: '#FFF',
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={NavigationStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
