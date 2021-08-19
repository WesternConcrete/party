import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';

export default class LoginView extends Component {
  state = {
    username: '',
    password: '',
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Username"
              underlineColorAndroid='transparent'
              onChangeText={(username) => this.setState({username})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#40364f',
  },
  inputContainer: {
      borderBottomColor: '#fff',
      backgroundColor: '#fff',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      fontSize: 20,
      height:45,
      marginLeft: 20,
      marginRight: 20,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:300,
    height:170,
    justifyContent: 'center',
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  linkContainer: {
    height:20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:15,
    width:250,
    borderRadius:30,
  },
  linkText: {
    color: "#fff",
  }
});
