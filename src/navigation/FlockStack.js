import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HeaderProfile from '../components/HeaderProfile';
import HeaderEgg from '../components/HeaderEgg';
import FlockScreen from '../containers/Flock';
import ChickenScreen from '../containers/Chicken';
import ChickenEditorScreen from '../containers/ChickenEditor';

export default createStackNavigator(
  {
    Flock: {
      screen: FlockScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Flock',
        headerLeft: <HeaderProfile navigation={navigation} />,
      }),
    },
    Chicken: {
      screen: ChickenScreen,
      navigationOptions: {
        title: 'Chicken Profile',
      },
    },
    ChickenEditor: {
      screen: ChickenEditorScreen,
      navigationOptions: {
        title: 'Chicken Editor',
        headerRight: null,
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerRight: <HeaderEgg navigation={navigation} />,
    }),
  },
);