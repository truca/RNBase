import React from 'react';
import { Form, Input, Container, Button, Item, Text, Toast, } from 'native-base'
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ImagePicker } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default class Profile extends React.Component {
  state = {
    image: null,
    uploading: false,
  };

  render() {
    let { image, uploading } = this.state;
    const text = { color: 'white' },
      buttons = { marginTop: 20 }

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Button block style={buttons} onPress={this._pickImage}>
          <Text style={text}>Pick an image from gallery</Text>
        </Button>
        <Button block style={buttons} onPress={this._takePicture}>
          <Text style={text}>Take a picture</Text>
        </Button>
        {uploading && <MaterialCommunityIcons name="loading" style={{padding: 10, marginLeft:10, fontSize: 20}}/> }
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(result);
  };

  _takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(result);
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        this.setState({ image: uploadResult.location });
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

async function uploadImageAsync(uri) {
  let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }

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

  return fetch(apiUrl, options);
}
