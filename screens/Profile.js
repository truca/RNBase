import React from 'react';
import { Form, Input, Container, Button, Item, Text, Toast, } from 'native-base'
import { View, TouchableOpacity, ScrollView, Image, Animated, Easing } from 'react-native';
import { Constants, ImagePicker } from 'expo';
import { Foundation } from '@expo/vector-icons';

export default class Profile extends React.Component {
  state = {
    image: null,
    uploading: false,
    apiUrl: Constants.isDevice? `https://1e1d9301.ngrok.io/upload` : `http://localhost:3000/upload`,
  };
  constructor () {
    super()
    this.spinValue = new Animated.Value(0)
  }
  componentDidMount () {
    this.spin()
  }
  spin () {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear
      }
    ).start(() => this.spin()) //callback after completion
  }
  getApiUrl = () => {
    return Constants.isDevice? `https://1e1d9301.ngrok.io` : `http://localhost:3000`
  }
  render() {
    let { image, uploading } = this.state;
    const text = { color: 'white' },
      buttons = { marginTop: 20 }
      const spin = this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Button block style={buttons} onPress={this._pickImage}>
          <Text style={text}>Pick an image from gallery</Text>
        </Button>
        <Button block style={buttons} onPress={this._takePicture}>
          <Text style={text}>Take a picture</Text>
        </Button>
        
        {uploading && 
          <Animated.View style={{ transform: [{rotate: spin}] }} >
            <Foundation name="refresh" style={{fontSize: 40}}/>
          </Animated.View> 
        }
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    this._handleImagePicked(result);
  };

  _takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    this._handleImagePicked(result);
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri, this.getApiUrl())
        uploadResult = await uploadResponse.json();
        console.log(uploadResult)
        let u = uploadResult
        console.log('image', `${this.getApiUrl()}/static/${u.filename}`) 
        this.setState({ image: `${this.getApiUrl()}/static/${u.filename}` });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false }); 
    }
  }
}

async function uploadImageAsync(uri, apiUrl) {
  /*let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  //DEV: ngrok http 3000
  if (Constants.isDevice) {
    apiUrl = `https://1e1d9301.ngrok.io/upload`; 
  } else {
    apiUrl = `http://localhost:3000/upload`
  }*/

  let uriParts = uri.split('.'); 
  let fileType = uri[uri.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  console.log(`${apiUrl}/upload`) 
  return fetch(`${apiUrl}/upload`, options);
}
