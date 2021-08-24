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

export default class pickName extends React.Component {
  state = {
    name: '',
    username: this.props.route.params.username,
    password: this.props.route.params.password,
    errMessage: null,
  }

  confirm = () => {
    if (!this.state.name) {
      this.setState({errMessage: 'Input your name.'})
    } else {
      this.props.navigation.navigate('createAccount', {...this.state})
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.content}>
        <View style={{padding: 15, alignItems: 'center'}}>
          <Text style={styles.headerText}>Set Name</Text>
          <Text style={styles.descriptionText}>Help your friends find you by displaying your name.</Text>
        </View>
        <View style={this.state.errMessage? styles.errInputContainer: styles.inputContainer}>
          <TextInput style={styles.inputs}
                autoCapitalize="none"
                placeholder="Name (optional)"
                underlineColorAndroid='transparent'
                onChangeText={(name) => this.setState({name, errMessage: null})}
                value={this.state.name}/>
          {this.state.name? <DeleteInput function={() => this.setState({name: ''})}/>: null}
        </View>
        {this.state.errMessage? <Text style={styles.errorText}>{this.state.errMessage}</Text>: null}
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.confirm}>
          <Text style={styles.loginText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkContainer} onPress={() => this.props.navigation.navigate('createAccount', {...this.state})}>
          <Text style={styles.linkText}>Skip</Text>
        </TouchableOpacity>
      </View>
      </View>
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
