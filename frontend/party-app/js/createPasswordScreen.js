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
import DeleteInput from "./helperJS/deleteInput"
import HideKeyboard from "./helperJS/dismissKeyboard"

const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/

export default class createPassword extends React.Component {
  state = {
    password: '',
    hidePassword: true,
    username: this.props.route.params.username,
    errMessage: null,
  }

  validatePassword = (password) => {
    if (password.length < 6) {
      this.setState({errMessage: "Password must be 6 or more characters"})
    } else {
      this.props.navigation.navigate('pickName', {username: this.state.username, password: this.state.password})
    }
  }

  typePassword = (password) => {
    this.state.errMessage? this.setState({errMessage: null}) : null
    if (regex.test(password)){
      this.setState({password})
    }
    
  }


  render() {
    return (
      <HideKeyboard>
        <View style={styles.container}>
        <View style={styles.content}>
          <View style={{padding: 15, alignItems: 'center'}}>
            <Text style={styles.headerText}>Create Password</Text>
            <Text style={styles.descriptionText}>Pick a password for your new account.</Text>
          </View>
          <View style={this.state.errMessage? styles.errInputContainer: styles.inputContainer}>
            <TextInput style={styles.inputs}
                  autoCapitalize="none"
                  placeholder="Password"
                  keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                  secureTextEntry={this.state.hidePassword}
                  underlineColorAndroid='transparent'
                  onChangeText={this.typePassword}
                  value={this.state.password}/>
            {this.state.password? 
              <TouchableOpacity style={{paddingRight: 12}} onPress={() => this.setState({hidePassword: !this.state.hidePassword})}>
                <Ionicons
                  name={this.state.hidePassword? "eye-outline": "eye"}
                  size={18}
                  color="black"
                />
              </TouchableOpacity>: null}
          </View>
          {this.state.errMessage? <Text style={styles.errorText}>{this.state.errMessage}</Text>: null}

          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.validatePassword(this.state.password)}>
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
