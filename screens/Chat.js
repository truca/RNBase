import React from 'react';
import { Form, Input, Container, Button, Item, Text, Toast, } from 'native-base'
import { ScrollView } from 'react-native';

export default class Chat extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    return (
      <Container>
        <Text>Chat con {params.user}</Text>
      </Container>
    ) 
  }
}