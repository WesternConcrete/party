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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import { loginUser, logoutUser } from "./redux/actions"
import { connect } from 'react-redux'

import {store} from './redux/store'
import DeleteInput from "./helperJS/deleteInput"

class LoginScreen extends React.Component {
  state = {
    username: '',
    password: '',
  }

  componentDidMount() {
    this.props.logoutUser()
    setTimeout(() => this.props.logoutUser(), 0)
  }

  render() {
    return (
        <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={styles.container}
            >
          <Image style={styles.inputIcon} source={require('../assets/png.png')}/>
          <View style={styles.linkContainer}>
            <Text style={{color: '#fff'}}>{this.props.errMessage}</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                autoCapitalize="none"
                placeholder="Username"
                underlineColorAndroid='transparent'
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}/>
            {this.state.username? <DeleteInput function={() => this.setState({username: ''})}/>: null}
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                autoCapitalize="none"
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}/>
            {this.state.password? <DeleteInput function={() => this.setState({password: ''})}/>: null}
          </View>

          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => {this.props.loginUser(this.state.username, this.state.password)}}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkContainer} onPress={() => this.props.navigation.navigate("createUsername")}>
              <Text style={styles.linkText}>Register</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

/*        <TouchableOpacity style={styles.linkContainer}>
            <Text style={styles.linkText}>Forgot your password?</Text>
        </TouchableOpacity>*/

    );
  }
}

const mapStateToProps = state => ({
    errMessage: state.user.errMessage,
})



export default connect(mapStateToProps, {loginUser, logoutUser})(LoginScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#40364f',
  },
  keyboardViewContainer: {
    alignItems: 'center',
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
      marginRight: 5,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:300,
    height:140,
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
    fontWeight: 'bold', 
    fontSize: 16,
  },

});
