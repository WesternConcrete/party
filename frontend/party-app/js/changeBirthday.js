import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker';
import {store} from "./redux/store"

import { changeBday } from './redux/actions'
import { changeBirthday } from './helperJS/api'
import DeleteInput from "./helperJS/deleteInput"
import HideKeyboard from "./helperJS/dismissKeyboard"

class ChangeBirthday extends React.Component {
  state = {
    bday: this.props.route.params.bday? new Date(Number(this.props.route.params.bday.slice(6)), Number(this.props.route.params.bday.slice(0,2))-1, Number(this.props.route.params.bday.slice(3,5))): new Date(Date.now()),
  }

  sendBday = async () => {
    const bday_formatted = ((this.state.bday.getMonth() > 8) ? (this.state.bday.getMonth() + 1) : ('0' + (this.state.bday.getMonth() + 1))) + '-' + ((this.state.bday.getDate() > 9) ? this.state.bday.getDate() : ('0' + this.state.bday.getDate())) + '-' + this.state.bday.getFullYear();
    await this.props.changeBday(bday_formatted)
    console.log(bday_formatted)
    const api_bday = bday_formatted.slice(6) + '-' + bday_formatted.slice(0,5)
    await changeBirthday(this.props.route.params.username, api_bday) 
    this.props.navigation.goBack()
  }

  handleChange = (event, bday) => {
    let inputValue = bday;

    this.setState((prevState, props) => {
      return {
        bday: inputValue
      }
    })
  }

  render() {
    return (
      <HideKeyboard>
      <View style={styles.container}>
      <View style={styles.content}>
        <View style={{padding: 15, alignItems: 'center'}}>
          <Text style={styles.headerText}>Set Birthday</Text>
          <Text style={styles.descriptionText}>Set your birthday to be invited to parties hosted by people around your age.</Text>
        </View>
        <View style={{
            backgroundColor: '#fff',
            borderRadius:30,
            width:270,
            height:200,
            marginBottom: 10,
            paddingHorizontal: 10,
            justifyContent: 'center',
        }}>
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.bday}
            mode={'date'}
            is24Hour={true}
            onChange={this.handleChange}
            display="spinner"
          />
        </View>
        {this.state.errMessage? <Text style={styles.errorText}>{this.state.errMessage}</Text>: null}
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.sendBday}>
          <Text style={styles.loginText}>Confirm</Text>
        </TouchableOpacity>
      </View>
      </View>
      </HideKeyboard>
    );
  }
}

export default connect(null, {changeBday: changeBday})(ChangeBirthday)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#40364f',
  },
  content: {
    marginTop: Constants.statusBarHeight+50,
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
      borderBottomColor: '#fff',
      backgroundColor: '#fff',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center'
  },
  errInputContainer: {
      backgroundColor: '#fff',
      borderRadius:30,
      borderColor: 'red',
      borderWidth: 1,
      width:250,
      height:45,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      fontSize: 20,
      height:45,
      marginLeft: 20,
      marginRight: 5,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
    marginBottom:15,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#c0c0c0",
  },
  loginText: {
    color: '#404040',
    fontSize:20
  },
  headerText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginHorizontal: '5%',
  },
  descriptionText: {
    textAlign: 'center',
    color: '#a9a9a9',
    fontSize: 14,
  }
});
