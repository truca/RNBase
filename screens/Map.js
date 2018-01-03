import React, { Component } from 'react'
//import { Marker } from 'react-native-maps'
import { Form, Input, Container, Button, Item, Text, Toast, } from 'native-base'
import { ScrollView, Image } from 'react-native';
//import { MapView } from 'expo';
import MapView from 'react-native-map-clustering';
import Marker from '../components/Marker';
import Session from 'rnsession' 

export default class Map extends Session {
  constructor(props){
    super(props)
    this.state = { data: [
      { location: { latitude: -33.4737980, longitude: -70.6308413, }},
      { location: { latitude: -33.4737980, longitude: -70.6298414, }},
      { location: { latitude: -33.4737980, longitude: -70.6288412, }},
      { location: { latitude: -33.4727879, longitude: -70.6308313, }},
      { location: { latitude: -33.4727879, longitude: -70.6298314, }},
      { location: { latitude: -33.4727879, longitude: -70.6288312, }},
      { location: { latitude: -33.4717778, longitude: -70.6308213, }},
      { location: { latitude: -33.4717778, longitude: -70.6298214, }},
      { location: { latitude: -33.4717778, longitude: -70.6298212, }},
      { location: { latitude: -33.4727879, longitude: -70.6298313, }},
    ]}
  }
  renderMarker = (data) => {
    const { navigate } = this.props.navigation;
    return <Marker
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
    return (
      <Container>
        <MapView 
          provider="google"
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomControlEnabled={true}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: -33.4727879,
            longitude: -70.6298313, 
            latitudeDelta: 0.3922,
            longitudeDelta: 0.3421,
          }}
        >
          {this.state.data.map( marker => this.renderMarker(marker) )}
        </MapView>
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