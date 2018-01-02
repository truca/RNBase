import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { StyleSheet, Button, View, TouchableOpacity, Icon } from 'react-native'

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Register from '../screens/Register';
import Login from '../screens/Login';
import ResetPassword from '../screens/ResetPassword';

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

/*const MenuButton = (
	<View>
		<TouchableOpacity onPress={() => { this.props.navigate('DrawerOpen') } }>
			<Icon name="bars" style={{color: 'white', padding: 10, marginLeft:10, fontSize: 20}}/>
		</TouchableOpacity>
	</View>
);*/

const AppNavigator = new StackNavigator({
	Main: {
		screen: RootDrawerNavigator,
	}
},{
  navigationOptions: ({ navigation }) => ({
    title: 'App',
    //headerLeft : <MenuButton navigate={navigation.navigate} />,
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
