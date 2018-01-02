import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { StyleSheet, Button, View, TouchableOpacity, Icon, Text } from 'react-native'

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Register from '../screens/Register';
import Login from '../screens/Login';
import ResetPassword from '../screens/ResetPassword';
import { FontAwesome } from '@expo/vector-icons';

const RootDrawerNavigator = DrawerNavigator(
  {
    Register: { 
      screen: Register, 
      navigationOptions: {
        headerVisible: true,
      },
    },
    Login: { screen: Login, },
    ResetPassword: { screen: ResetPassword, }
  },
  {
    navigationOptions: {
      headerVisible: true,
    },
    headerMode: 'screen',
    drawerPosition: 'right',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle', 
  }
);

class MenuButton extends React.Component {
  render() {
    return (
      <View>
        <FontAwesome name="bars" style={{padding: 10, marginLeft:10, fontSize: 20}} onPress={() => { this.props.navigate('DrawerOpen') }} /> 
      </ View>
    );
  }
}

/*class MenuButton extends React.Component {
  render() { 
    return (
      <View>
        <TouchableOpacity onPress={() => { this.props.navigate('DrawerOpen') } }>
          <Icon name="bars" style={{color: 'white', padding: 10, marginLeft:10, fontSize: 20}}/>
        </TouchableOpacity>
      </View>)
  }
}*/

/*const MenuButton = () => {
  return 
    <View>
      <TouchableOpacity onPress={() => { this.props.navigate('DrawerOpen') } }>
        <Icon name="bars" style={{color: 'white', padding: 10, marginLeft:10, fontSize: 20}}/>
      </TouchableOpacity>
    </View>
}*/

const AppNavigator = new StackNavigator({
	Main: {
		screen: RootDrawerNavigator,
	}
},{
  navigationOptions: ({ navigation }) => ({
    title: 'App',
    headerRight: <MenuButton navigate={navigation.navigate} />,
  })
});

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
    return <AppNavigator />;
  }
}
