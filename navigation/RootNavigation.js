import React from 'react';
import { DrawerNavigator, StackNavigator, SafeAreaView, DrawerItems } from 'react-navigation';
import { StyleSheet, View, TouchableOpacity, Icon, Text, ScrollView, Picker } from 'react-native'
import { Button } from 'native-base'
import { FontAwesome } from '@expo/vector-icons';
import R from 'ramda'
import NavigatorService from '../services/navigator';

import Register from '../screens/Register';
import Login from '../screens/Login';
import ResetPassword from '../screens/ResetPassword';
import Map from '../screens/Map';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';

import Session from 'rnsession'

class CustomDrawerContentComponent extends Session {
  getItems(){
    let items = this.state.user? 
      [ 
        { "key": "Map", "routeName": "Map", },
        { "key": "Profile", "routeName": "Profile", }
      ] 
      : 
      [ 
        { "key": "Register", "routeName": "Register", }, 
        { "key": "Login", "routeName": "Login", }, 
        { "key": "Map", "routeName": "Map", }, 
        { "key": "ResetPassword", "routeName": "ResetPassword", }, 
      ]
    
    return items
  }
  render(){
    let items = this.getItems.bind(this)()
    const text = { color: 'white' }
    return (<ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...R.dissocPath(['items'], this.props)} items={items} />
        <Picker selectedValue={this.state.language} onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        {this.state.user? 
          <Button block onPress={ this.logout.bind(this) } ><Text style={text} >Logout</Text></Button>
          : null
        }
        
      </SafeAreaView>
    </ScrollView>)   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const RootDrawerNavigator = DrawerNavigator(
  {
    Map: { screen: Map, },
    Profile: { screen: Profile, },
    Register: { screen: Register, },
    Login: { screen: Login, },
    Chat: { screen: Chat, },
    ResetPassword: { screen: ResetPassword, }
  },
  {
    drawerPosition: 'right',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentComponent: CustomDrawerContentComponent,
    //backBehavior: 'none', the back button is using the routes from StackNavigator
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

class BackButton extends React.Component {
  render() {
    return (
      <View>
        <FontAwesome name="chevron-left" style={{padding: 10, marginRight:10, fontSize: 20}} onPress={() => { this.props.goBack(null) }} /> 
      </ View>
    );
  }
} 

const AppNavigator = new StackNavigator({
	Main: {
		screen: RootDrawerNavigator,
	}
},{
  navigationOptions: ({ navigation }) => ({
    title: 'App',
    headerRight: <MenuButton navigate={navigation.navigate} />,
    headerLeft: <BackButton goBack={navigation.goBack} />,
  })
});

export default class RootNavigator extends React.Component {
  render() {
    return <AppNavigator ref={navigatorRef => {
      NavigatorService.setContainer(navigatorRef);
    }}/>;
  }
}
