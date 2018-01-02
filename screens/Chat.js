import React from 'react';

import { Form, Input, Container, Button, Item, Text, Toast, } from 'native-base'

import { ScrollView, Image } from 'react-native';
import { MapView } from 'expo';
import Session from 'rnsession'


export default class Chat extends Session {
  render() {
    const { params } = this.props.navigation.state;
    return (
      <Container>
        <Text>Chat con {params.user}</Text>
      </Container>
    ) 
  }
}