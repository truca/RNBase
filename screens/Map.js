import React, { Component } from 'react'
import ClusteredMapView from 'react-native-maps-super-cluster'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Constants, Location, Permissions } from 'expo';

import { Form, Input, Container, Button, Item, Text, Toast, } from 'native-base'
import {
  Platform,
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

class MyMarker extends MapView.Marker {
  onPress(){
    console.log('handlePress', this.props)
    //this.props.handlePress()
    this.showCallout()
  }
  render(){
    return <MapView.Marker {...this.props} onPress={this.onPress.bind(this)} />
  }
}

export default class Map extends Session {
  state = {
    location: null,
    errorMessage: null,
    data: null,
    region: null,
    checkForLocationinterval: null,
  }
  constructor(props){
    super(props)
    const region = getRegion(INIT_REGION.latitude, INIT_REGION.longitude, INIT_REGION.latitudeDelta);
    this.state = { region, data: R.times(n => this.generateLocation(n, -10, 10), 100)}
  }
  generateLocation(idx, max, min){
    return { 
      id: idx,
      location: { 
        latitude:  (-33.4727879 + Math.random() * (max - min) + min),
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
      onPress={ () => this.handleMarkerPress(data.location) } 
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
    if(this.state.location){
      const region = getRegion(
        this.state.location.coords.latitude,
        this.state.location.coords.longitude,
        this.state.region.latitudeDelta
      );
      this.setState({region});
    }
  }
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let { locationServicesEnabled } = await Location.getProviderStatusAsync();
    if( locationServicesEnabled ){
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    }else{
      Toast.show({ text: 'Please turn on the location services', 
        position: this.props.toastPosition, 
        buttonText: this.props.toastText, 
        duration: this.props.notificationDuration, })
      //  duration: 0.5*60*1000,
      //set watch to get user geolocation
      let checkForLocationinterval = setInterval(async () => {
        let { locationServicesEnabled } = await Location.getProviderStatusAsync();
        if( locationServicesEnabled ){
          let location = await Location.getCurrentPositionAsync({});
          clearInterval(this.state.checkForLocationinterval)
          this.setState({ location, checkForLocationinterval: null });
        }else{
          //Toast.show({ text: 'Please turn on the location services', position: this.props.toastPosition, duration: 2*1000, })
        }
      }, this.props.checkLocationInterval)
      this.setState({ checkForLocationinterval })
    }
  }
  componentWillUnmount(){
    if(this.state.checkForLocationinterval){
      clearInterval(this.state.checkForLocationinterval)
    }
  }
  handleMarkerPress = (location) => {
    this.mapMovement(location, this.state.region.latitudeDelta)
  }
  handleClusterPress = (location) => {
    this.mapMovement(location, this.state.region.latitudeDelta*0.5)
  }
  mapMovement = (location, latitudeDelta) => {
    const region = getRegion(
      location.latitude,
      location.longitude,
      latitudeDelta,
    );
    console.log('this.map', this.map)  
    this.setState({region})
  }
  setRegion = (region) => {
    this.setState({region})
  }
  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
          coordinate = cluster.coordinate,
          clusterId = cluster.clusterId

    // use pointCount to calculate cluster size scaling
    // and apply it to "style" prop below

    // eventually get clustered points by using
    // underlying SuperCluster instance
    // Methods ref: https://github.com/mapbox/supercluster
    //const clusteringEngine = this.map.getClusteringEngine(),
    //      clusteredPoints = clusteringEngine.getLeaves(clusterId, 100)
    return ( 
      <MapView.Marker coordinate={coordinate} 
        onPress={() => { this.handleClusterPress(coordinate) }}
        image={ require('../assets/images/robot-dev.png') }> 
        <View style={styles.myClusterStyle}>
          <Text style={styles.myClusterTextStyle}>
            {pointCount}
          </Text>
        </View>
        {
          /*
            Eventually use <Callout /> to
            show clustered point thumbs, i.e.:
            <Callout>
              <ScrollView>
                {
                  clusteredPoints.map(p => (
                    <Image source={p.image}>
                  ))
                }
              </ScrollView>
            </Callout>

            IMPORTANT: be aware that Marker's onPress event isn't really consistent when using Callout.
           */
        }
      </MapView.Marker>
    )
  }
  render() {
    const { location } = this.state
    const { navigate } = this.props.navigation;
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) { 
      text = JSON.stringify(this.state.location);
    }
    //console.log('map', text)  
    return (
      <Container style={styles.container2} >
        <ClusteredMapView
          style={styles.map}
          data={this.state.data}
          region={this.state.region}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
          textStyle={{ color: '#65bc46' }}
          moveOnMarkerPress={false}
          //onRegionChange={this.setRegion} 
          onRegionChangeComplete={this.setRegion}
          containerStyle={{backgroundColor: 'white', borderColor: '#65bc46'}}>
          {location? 
            (<MapView.Marker
              key={this.state.data.length}
              coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} 
              onPress={ () => this.handleMarkerPress({ latitude: location.coords.latitude, longitude: location.coords.longitude }) }
            />) : null
          }
        </ClusteredMapView> 

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => this.increment()} style={[styles.bubble, styles.button]} >
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.decrement()} style={[styles.bubble, styles.button]} >
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.center()} style={[styles.bubble, styles.button, { paddingVertical: 12, display: location? 'flex' : 'none' }]} > 
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
  toastPosition: 'bottom',
  toastText: 'Ok',
  notificationDuration: 0.5*60*1000,
  checkLocationInterval: 1*1000,
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
      marginBottom: 60,
      backgroundColor: 'transparent',
      marginRight: 5, 
  },
});
