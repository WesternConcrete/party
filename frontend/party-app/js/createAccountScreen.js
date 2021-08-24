import React from 'react';
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
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

import {createUser} from "./helperJS/api"

import { loginUser} from "./redux/actions"
import { connect } from 'react-redux'

class createAccount extends React.Component {
  state = {
    name: this.props.route.params.name || null,
    username: this.props.route.params.username,
    password: this.props.route.params.password,
  }

  componentDidMount() {
    console.log(this.state)
  }

  createButton = async () => {
    const account_info = await createUser({...this.state})
    this.props.loginUser(account_info.username, account_info.password)
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.content}>
        <View style={{paddingTop: 15,paddingHorizontal: 15, alignItems: 'center'}}>
          <Text style={styles.headerText}>Welcome {this.state.name || this.state.username}!</Text>
          <Text style={styles.descriptionText}>Press "Confirm Account" to complete the sign up process.</Text>
        </View>
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.createButton}>
          <Text style={styles.loginText}>Confirm Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkContainer} onPress={() => {this.props.navigation.goBack();this.props.navigation.goBack();this.props.navigation.goBack();this.props.navigation.goBack()}}>
          <Text style={styles.linkText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}

export default connect(null, {loginUser})(createAccount)

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
    textAlign: 'center',
    color: '#a9a9a9',
    fontSize: 14,
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
    fontWeight: 'bold', 
    fontSize: 16,
  },
});
