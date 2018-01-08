import React from 'react';
import { Form, Input, Container, Button, Item, Text, Toast, } from 'native-base'
import { ScrollView } from 'react-native';
import Fetcher from '../services/fetcher.js'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'


class FetcherScreen extends React.Component {
  state = {
    fetcher: null,
    echo: null,
    message: "",
  }
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.fetcher = new Fetcher("https://restcountries.eu/", this.props.getDispatch())
    this.fetcher.get('rest/v1/all', {}, this.props.setCountries )
  }
  render() {
    const text = { color: 'white' }
    const buttons = { marginTop: 20 }
    let { countries } = this.props
    console.log(countries)
    return (
      <Container>
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
          <Text style={{fontSize: 30, marginBottom: 10}} >Countries</Text>
          {countries && Array.isArray(countries) && 
            countries.map((country, i) => <Text key={i} >{country.name}</Text>)
          }
        </ScrollView>
      </Container>
    ) 
  }
}

const FetcherConnected = connect(
  state => ({
    countries: state.countries,
  }),
  dispatch => ({
    setCountries: (countries) => {
      console.log("countries", countries.length)
      return actions.setCountries(countries)
    },
    getDispatch: () => dispatch
  })
)(FetcherScreen)

export default FetcherConnected