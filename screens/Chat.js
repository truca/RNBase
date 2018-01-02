import React from 'react';

import { Form, Input, Container, Button, Item, Text, Toast, } from 'native-base'

import { ScrollView } from 'react-native';



export default class Chat extends React.Component {
  render() {
    const { navigate, state } = this.props.navigation;
    return (
      <Container>
        <Text>Chat con {state.params.user}</Text>
      </Container>
    ) 
  }
}