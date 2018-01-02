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

import Session from 'rnsession'

export default class Register extends Session {
  static navigationOptions = {
    drawerLabel: 'Register',
    
  };
  constructor(props) {
    console.log( 'props', props )
    super( props )
    this.state = {user: null, pass: null}
  }
  registerHandle(){
    this.register.bind(this)(this.state.email, this.state.pass, this.state.pass_confirmation)
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
            <Item last>
            <Input placeholder="Repeat Password" secureTextEntry={true} 
              onChangeText={(pass_confirmation) => this.setState({ pass_confirmation })} 
              value={this.state.pass_confirmation} />
            </Item>
            <Button block style={buttons} onPress={this.registerHandle.bind(this)}>
              <Text style={text}>
                Registro
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
        </ScrollView>
      </Container>)
  }
}

Register.defaultProps = {
  facebookAppId: '684616555049875',
  config: {
    apiKey: 'AIzaSyDw-u_c-vvKMtoE-Ha0KjBgXbCPcSUWENs',
    authDomain: 'clanapp-d35d2.firebaseapp.com',
    databaseURL: 'https://clanapp-d35d2.firebaseio.com',
    storageBucket: 'clanapp-d35d2.appspot.com',
    messagingSenderId: '935866938730'
  },
}