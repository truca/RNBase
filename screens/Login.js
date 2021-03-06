import React from 'react';

import {
  Form,
  Input,
  Container,
  Button,
  Item,
  Text,
  Toast,
} from 'native-base'

import {
  ScrollView
} from 'react-native';

import Session from 'rnsession'

export default class Login extends Session {
  static navigationOptions = {
    drawerLabel: 'Login',
    
  };
  constructor(props) {
    console.log( 'props', props )
    super( props )
    this.state = {user: null, pass: null}
  }
  printUser(){
    console.log('user', this.state.user)
  }
  loginHandle(){
    this.login.bind(this)(this.state.email, this.state.pass)
  }
  render() { 
    const buttons = { marginTop: 20 }
    const text = { color: 'white' }
    //console.log('user', this.state.user)
    return this.state.user? (
      <Container>
        <Text>User: { this.state.user.providerData[0].email }</Text>
        <Button block style={buttons} onPress={ this.logout.bind(this)  }>
          <Text style={text}>
            Desconectarse
          </Text>
        </Button>
      </Container>
    ) : ( 
      <Container>
        <ScrollView>
          <Form>
            <Item>
              <Input keyboardType="email-address" placeholder="E-mail" onChangeText={(email) => this.setState({ email })} value={this.state.email} />
            </Item>
            <Item last>
              <Input placeholder="Password" secureTextEntry={true} onChangeText={(pass) => this.setState({ pass })} value={this.state.pass} />
            </Item>
            <Button block style={buttons} onPress={this.loginHandle.bind(this)}>
              <Text style={text}>
                Ingreso
              </Text>
            </Button>
            <Button block style={buttons} onPress={ this.facebook.bind(this) }>
              <Text style={text}>
                facebook
              </Text>
            </Button>
            <Button block style={buttons} onPress={ this.google.bind(this) }>
              <Text style={text}>
                google
              </Text>
            </Button>
          </Form>
        </ ScrollView>
      </Container>)
  }
}

Login.defaultProps = {
  facebookAppId: '684616555049875',
  config: {
    apiKey: 'AIzaSyDw-u_c-vvKMtoE-Ha0KjBgXbCPcSUWENs',
    authDomain: 'clanapp-d35d2.firebaseapp.com',
    databaseURL: 'https://clanapp-d35d2.firebaseio.com',
    storageBucket: 'clanapp-d35d2.appspot.com',
    messagingSenderId: '935866938730'
  },
}