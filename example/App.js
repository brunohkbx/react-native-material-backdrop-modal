import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Appbar, DefaultTheme, List } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Backdrop from '../src/Backdrop';

const HomeScreen = ({ navigation }) => {
  const [focusedBackdrop, setFocusedBackdrop] = useState(true);

  useEffect(() => {
    navigation.setParams({
      focusedBackdrop,
      showCategories: () => setFocusedBackdrop(!focusedBackdrop),
    });
  }, [focusedBackdrop]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <List.Item
          title="TV & Home Theaters"
          left={props => <List.Icon {...props} color="#FFF" icon="live-tv" />}
          onPress={() => {}}
          titleStyle={styles.listTitle}
        />
        <List.Item
          title="Computers"
          left={props => <List.Icon {...props} color="#FFF" icon="computer" />}
          onPress={() => {}}
          titleStyle={styles.listTitle}
        />
        <List.Item
          title="Cameras and Camcorders"
          left={props => (
            <List.Icon {...props} color="#FFF" icon="photo-camera" />
          )}
          onPress={() => {}}
          titleStyle={styles.listTitle}
        />
        <List.Item
          title="Mobile Phones"
          left={props => (
            <List.Icon {...props} color="#FFF" icon="phone-android" />
          )}
          onPress={() => {}}
          titleStyle={styles.listTitle}
        />
        <List.Item
          title="Speakers"
          left={props => <List.Icon {...props} color="#FFF" icon="speaker" />}
          onPress={() => {}}
          titleStyle={styles.listTitle}
        />
        <List.Item
          title="Video Games"
          left={props => (
            <List.Icon {...props} color="#FFF" icon="videogame-asset" />
          )}
          onPress={() => {}}
          titleStyle={styles.listTitle}
        />
        <List.Item
          title="Movies"
          left={props => (
            <List.Icon {...props} color="#FFF" icon="local-movies" />
          )}
          onPress={() => {}}
          titleStyle={styles.listTitle}
        />
        <List.Item
          title="Music"
          left={props => (
            <List.Icon {...props} color="#FFF" icon="music-note" />
          )}
          onPress={() => {}}
          titleStyle={styles.listTitle}
        />
        <List.Item
          title="Wearables"
          left={props => <List.Icon {...props} color="#FFF" icon="watch" />}
          onPress={() => {}}
          titleStyle={styles.listTitle}
        />
        <List.Item
          title="Connected Home"
          left={props => <List.Icon {...props} color="#FFF" icon="wifi" />}
          onPress={() => {}}
          titleStyle={styles.listTitle}
        />
        <List.Item
          title="Toys"
          left={props => <List.Icon {...props} color="#FFF" icon="toys" />}
          onPress={() => {}}
          titleStyle={styles.listTitle}
        />
      </ScrollView>
      <Backdrop
        focused={focusedBackdrop}
        onFocus={() => setFocusedBackdrop(!focusedBackdrop)}
        title="All Products"
        icon={
          focusedBackdrop ? (
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#000" />
          ) : (
            <MaterialIcons name="keyboard-arrow-up" size={24} color="#000" />
          )
        }
      >
        <ScrollView>
          <List.Item title="Product 1" />
          <List.Item title="Product 2" />
          <List.Item title="Product 3" />
          <List.Item title="Product 4" />
          <List.Item title="Product 5" />
          <List.Item title="Product 6" />
          <List.Item title="Product 7" />
          <List.Item title="Product 8" />
          <List.Item title="Product 9" />
          <List.Item title="Product 10" />
          <List.Item title="Product 11" />
        </ScrollView>
      </Backdrop>
    </View>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: (
    <Appbar.Action
      icon={navigation.getParam('focusedBackdrop') ? 'menu' : 'close'}
      color="#FFF"
      onPress={navigation.getParam('showCategories')}
    />
  ),
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: 'Shop Electronics',
      headerStyle: {
        backgroundColor: DefaultTheme.colors.primary,
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerTintColor: '#FFF',
    }),
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultTheme.colors.primary,
  },
  listTitle: {
    color: '#FFF',
  },
});

export default createAppContainer(AppNavigator);
