import React from 'react';
import { Form, Input, Container, Button, Item, Text, Toast, } from 'native-base'
import { ScrollView } from 'react-native';
import Sockets from '../services/sockets.js'

export default class SocketsScreen extends React.Component {
  state = {
    sockets: null,
    echo: null,
    message: "",
  }
  constructor(props){
    super(props)
    this.sockets = new Sockets()
    console.log("sockets", this.sockets)
    this.echo = this.sockets.subscribe("ws://echo.websocket.org", {
      message: this.message
    })
    console.log("echo", this.echo)
  }
  message(e){ console.log(e.data) }
  render() {
    const text = { color: 'white' }
    const buttons = { marginTop: 20 }
    return (
      <Container style={{ alignItems: 'center', paddingTop: 20 }}>
        <Text>Mensajes</Text>
        <Item last>
          <Input placeholder="Mensaje" onChangeText={(message) => this.setState({ message })} value={this.state.message} />
        </Item>
        <Button block style={buttons} onPress={() => this.echo.send(this.state.message)}>
          <Text style={text}>
            Enviar Mensaje
          </Text>
        </Button>
      </Container>
    ) 
  }
}