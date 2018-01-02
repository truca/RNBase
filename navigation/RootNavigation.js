import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { StyleSheet, Button, View } from 'react-native'

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Register from '../screens/Register';
import Login from '../screens/Login';
import ResetPassword from '../screens/ResetPassword';

const RootStackNavigator = DrawerNavigator(
  {
    ResetPassword: {
      screen: ResetPassword,
    },
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
  }
);

/*
,
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
*/

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator />;
  }
}
