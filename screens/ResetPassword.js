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

import Session from '../components/RNSession'

export default class Login extends Session {
  constructor(props) {
    console.log( 'props', props )
    super( props )
    this.state = {user: null, pass: null}
  }
  printUser(){
    console.log('user', this.state.user)
  }
  resetPasswordHandle(){
    this.resetPassword.bind(this)(this.state.email)
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
            <Button block style={buttons} onPress={this.resetPasswordHandle.bind(this)}>
              <Text style={text}>
                Reset Password
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