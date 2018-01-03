import React, { Component } from 'react'
import ClusteredMapView from 'react-native-maps-super-cluster'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Form, Input, Container, Button, Item, Text, Toast, } from 'native-base'
import {
  ScrollView, 
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { MapView } from 'expo';
import Session from 'rnsession'
import R from 'ramda'

const INIT_REGION = { 
  latitude: -33.4727879,
  longitude: -70.6298313,
  latitudeDelta: 0.3922,
  longitudeDelta: 0.3421,
}

const USER_REGION = { 
  latitude: -30.9178213,
  longitude: -65.966537,
  latitudeDelta: 0.3922,
  longitudeDelta: 0.3421,
}

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

export function getRegion(latitude, longitude, latitudeDelta) {
  const LONGITUDE_DELTA = latitudeDelta * ASPECT_RATIO;

  return {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: LONGITUDE_DELTA,
  };
}

export default class Map extends Session {
  constructor(props){
    super(props)
    const region = getRegion(INIT_REGION.latitude, INIT_REGION.longitude, INIT_REGION.latitudeDelta);
    this.state = { region, data: R.times(n => this.generateLocation(n, -10, 10), 100)}
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
  increment() {
    const region = getRegion(
      this.state.region.latitude,
      this.state.region.longitude,
      this.state.region.latitudeDelta * 0.5
    );

    this.setState({region});
  }

  decrement() {
    const region = getRegion(
      this.state.region.latitude,
      this.state.region.longitude,
      this.state.region.latitudeDelta / 0.5
    );
    this.setState({region});
  }
  center() {
    const region = getRegion(
      USER_REGION.latitude,
      USER_REGION.longitude,
      this.state.region.latitudeDelta
    );
    this.setState({region});
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container2} >
        <ClusteredMapView
          style={styles.map}
          data={this.state.data}
          region={this.state.region}
          renderMarker={this.renderMarker} 
          textStyle={{ color: '#65bc46' }}
          containerStyle={{backgroundColor: 'white', borderColor: '#65bc46'}} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => this.increment()} style={[styles.bubble, styles.button]} >
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.decrement()} style={[styles.bubble, styles.button]} >
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.center()} style={[styles.bubble, styles.button, { paddingVertical: 12 }]} >
                <MaterialCommunityIcons style={{fontSize: 18, fontWeight: 'bold'}} name="map-marker-radius" />
            </TouchableOpacity>
          </View>
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

const styles = StyleSheet.create({
  container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
  },
  container2: { 
    justifyContent: 'flex-end', 
    flexDirection: 'column', 
    alignItems: 'flex-end' 
  },
  map: {
      ...StyleSheet.absoluteFillObject,
  },
  bubble: {
      backgroundColor: 'rgba(255,255,255,0.7)',
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 0,
  },
  latlng: {
      width: 200,
      alignItems: 'stretch',
  },
  button: {
      width: 50,
      paddingVertical: 8,
      alignItems: 'center',
      marginVertical: 5,
  },
  buttonContainer: {
      flexDirection: 'column',
      marginVertical: 20,
      backgroundColor: 'transparent',
      marginRight: 5, 
  },
});