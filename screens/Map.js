import React from 'react';

import { Form, Input, Container, Button, Item, Text, Toast, } from 'native-base'

import { ScrollView } from 'react-native';



export default class Map extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Text>Map</Text>
        <Button block style={{color: 'white'}} onPress={() => navigate('Chat', { user: 'Lucy' })} ><Text>Lucy</Text></Button> 
      </Container>
    ) 
  }
}