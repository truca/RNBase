import React, { Component } from 'react'
import ClusteredMapView from 'react-native-maps-super-cluster'

import { Form, Input, Container, Button, Item, Text, Toast, } from 'native-base'
import { ScrollView, Image } from 'react-native';
import { MapView } from 'expo';
import Session from 'rnsession'
import R from 'ramda'

const INIT_REGION = {
  latitude: -33.4727879,
  longitude: -70.6298313,
  latitudeDelta: 0.3922,
  longitudeDelta: 0.3421,
} 

export default class Map extends Session {
  constructor(props){
    super(props)
    this.state = { data: R.times(n => this.generateLocation(n, -10, 10), 100)}
  }
  generateLocation(idx, max, min){
    return { 
      id: idx,
      location: { 
        latitude: (-33.4727879 + Math.random() * (max - min) + min), 
        longitude: (-70.6298313 + Math.random() * (max - min) + min),
      }
    }
  }
  renderMarker = (data) => {
    const { navigate } = this.props.navigation;
    return <MapView.Marker
      key={data.id || Math.random()}
      coordinate={data.location}
      title="Fiesta!"
      description="Pastuza wena onda"
      image={ require('../assets/images/robot-prod.png') }
      onCalloutPress={ () => this.state.user? navigate('Chat', { user: 'Lucy' }) : navigate('Login')}
      onPress={ this.showCallout }
    />
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <ClusteredMapView
          style={{flex: 1}}
          data={this.state.data}
          initialRegion={INIT_REGION}
          renderMarker={this.renderMarker}
          textStyle={{ color: '#65bc46' }}
          containerStyle={{backgroundColor: 'white', borderColor: '#65bc46'}} />
      </Container> 
    ) 
  }
}

Map.defaultProps = {
  facebookAppId: '684616555049875',
  config: {
    apiKey: 'AIzaSyDw-u_c-vvKMtoE-Ha0KjBgXbCPcSUWENs',
    authDomain: 'clanapp-d35d2.firebaseapp.com',
    databaseURL: 'https://clanapp-d35d2.firebaseio.com',
    storageBucket: 'clanapp-d35d2.appspot.com',
    messagingSenderId: '935866938730'
  },
}