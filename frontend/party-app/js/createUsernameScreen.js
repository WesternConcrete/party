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

import DeleteInput from "./helperJS/deleteInput"
import {checkUsername} from "./helperJS/api"
import consecutiveChecker from "./helperJS/consecutiveChecker"

const regex = /^[A-Za-z0-9._]{0,20}$/

import HideKeyboard from "./helperJS/dismissKeyboard"

export default class createUsername extends React.Component {
  state = {
    username: '',
    errMessage: null,
  }

  nextButtonPress = async () => {
    await this.validateUsername(this.state.username)
    if (this.state.errMessage === null) {
      const response = await checkUsername(this.state.username)
      if (response.errMessage === null) {
        this.props.navigation.navigate('createPassword', {username: this.state.username})
      } else {
        this.setState({errMessage: response.errMessage})
      }
    }
    
  }

  validateUsername = (username) => {
    if (regex.test(username)){
      if (username[0] === '.' || username[0] === '_' || username[username.length -1] === '.' || username[username.length - 1] === '_') {
        this.setState({username, errMessage: "Usernames cannot begin or end with periods or underscores."})
      } else if (consecutiveChecker(username)){
        this.setState({username, errMessage: "Usernames cannot have two consecutive periods."})
      } else if (username.length > 20){
        this.setState({errMessage: "Usernames must be less than 20 characters."})
      } else if (username === ''){
        this.setState({username, errMessage: "Input a username."})
      } else {
        this.setState({username, errMessage: null})
      }
    } else {
      this.setState({errMessage: "Usernames can only use Roman letters (a-z, A-Z), numbers, underscores, and periods."})
    }
  }


  render() {
    return (
      <HideKeyboard>
      <View style={styles.container}>
      <View style={styles.content}>
        <View style={{padding: 15, alignItems: 'center'}}>
          <Text style={styles.headerText}>Create Username</Text>
          <Text style={styles.descriptionText}>Pick a username for your new account.</Text>
        </View>
        <View style={this.state.errMessage? styles.errInputContainer: styles.inputContainer}>
          <TextInput style={styles.inputs}
              autoCapitalize="none"
              placeholder="Username"
              keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
              underlineColorAndroid='transparent'
              onChangeText={this.validateUsername}
              value={this.state.username}/>
          {this.state.username? <DeleteInput function={() => this.setState({username: ''})}/>: null}
        </View>
        {this.state.errMessage? <Text style={styles.errorText}>{this.state.errMessage}</Text>: null}
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.nextButtonPress}>
          <Text style={styles.loginText}>Next</Text>
        </TouchableOpacity>
      </View>
      </View>
      </HideKeyboard>
    );
  }
}

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
    color: '#a9a9a9',
    fontSize: 14,
  }
});
