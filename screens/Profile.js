import React from 'react';
import { Form, Input, Container, Button, Item, Text, Toast, } from 'native-base'
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ImagePicker } from 'expo';

export default class Profile extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;
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
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  _takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}