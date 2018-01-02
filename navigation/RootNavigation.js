import React from 'react';
import { DrawerNavigator, StackNavigator, SafeAreaView, DrawerItems } from 'react-navigation';
import { StyleSheet, Button, View, TouchableOpacity, Icon, Text, ScrollView } from 'react-native'

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Register from '../screens/Register';
import Login from '../screens/Login';
import ResetPassword from '../screens/ResetPassword';
import { FontAwesome } from '@expo/vector-icons';

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

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
    contentComponent: CustomDrawerContentComponent, 
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

class Sidebar extends React.Component {
  render() {
    return (
      <View>
        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis ipsum ac lectus venenatis, ac dignissim diam ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ultrices sit amet arcu sed tincidunt. Etiam eget euismod libero, ac elementum lacus. Vivamus at convallis dui. Integer tristique a odio a eleifend. Nulla neque mi, maximus vitae egestas id, varius eu ligula. Curabitur aliquam justo ac dui elementum, eget elementum quam varius. Nulla viverra nisl eu gravida blandit. Praesent sodales orci augue, sit amet sodales metus faucibus non. Nulla odio lacus, pulvinar vitae consequat nec, ultricies ac magna. Proin interdum eu sem nec vestibulum.
        
        Aenean vitae dignissim enim, vel ornare erat. Etiam et rutrum enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut arcu dui, posuere eu imperdiet id, dapibus id sapien. Quisque fermentum faucibus odio, ullamcorper dapibus felis commodo sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer hendrerit vehicula enim. Donec vehicula purus nec faucibus venenatis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis porttitor ante ut elit lobortis, ut pharetra urna rhoncus. Nam elit enim, aliquet ut pretium ut, pellentesque ac mi. Quisque consequat lorem velit, pretium laoreet lacus porta egestas.
        
        Donec efficitur eget ante nec sollicitudin. Nunc sit amet tellus quis lorem congue eleifend. Ut egestas mollis leo, vitae sollicitudin neque cursus in. Aenean porta eleifend est non laoreet. Etiam faucibus nunc sed neque auctor egestas. Donec eget urna tincidunt arcu volutpat tempus. Aenean porta porta auctor. Maecenas dui massa, suscipit eu sagittis laoreet, laoreet nec risus. Curabitur eleifend nisl ac suscipit eleifend. Donec laoreet risus sed arcu mattis hendrerit.
        
        Fusce ullamcorper est magna. Donec commodo vitae turpis egestas mattis. Nulla facilisi. Sed iaculis, tellus vitae gravida ullamcorper, leo mi pharetra arcu, a malesuada nisi est vitae nisi. Phasellus scelerisque risus massa, ut bibendum ex feugiat convallis. Maecenas eu auctor sapien. Quisque diam magna, feugiat a faucibus ac, interdum id justo. Nulla sed nunc in erat dapibus fermentum. Praesent mi mi, vestibulum sit amet neque suscipit, efficitur auctor dui.
        
        Vivamus finibus varius mi consequat rhoncus. Pellentesque egestas gravida scelerisque. Integer porttitor at risus ac malesuada. Pellentesque sit amet massa finibus, mollis nulla id, fringilla turpis. Phasellus eget sem nunc. Integer vulputate eros lorem, et auctor nibh tempor in. Integer nunc sapien, convallis id sem ut, ullamcorper congue sapien. Etiam massa dolor, consectetur rutrum fermentum et, ultricies rutrum purus. Praesent nec massa mattis, efficitur mi eu, interdum turpis. Suspendisse sit amet nisl vel magna tempus congue aliquam sit amet neque. Suspendisse potenti.</Text>
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
  })
});

export default class RootNavigator extends React.Component {
  render() {
    return <AppNavigator />;
  }
}
