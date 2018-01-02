import React from 'react';

import { Form, Input, Container, Button, Item, Text, Toast, } from 'native-base'

import { ScrollView, Image } from 'react-native';
import { MapView } from 'expo';
import Session from 'rnsession'


export default class Map extends Session {
  render() {
    const { navigate } = this.props.navigation;
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
          
            <MapView.Marker
              coordinate={{
                latitude: -33.4727879,
                longitude: -70.6298313,
              }}
              title="Fiesta!"
              description="Pastuza wena onda"
              image={ require('../assets/images/robot-prod.png') }
              onCalloutPress={ () => this.state.user? navigate('Chat', { user: 'Lucy' }) : navigate('Login')}
              onPress={ this.showCallout }
            />
          
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