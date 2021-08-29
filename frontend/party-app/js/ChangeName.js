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

import { changeNameAction } from './redux/actions'
import { changeName } from './helperJS/api'
import DeleteInput from "./helperJS/deleteInput"

import HideKeyboard from "./helperJS/dismissKeyboard"

class ChangeName extends React.Component {
  state = {
    name: this.props.route.params.name,
  }

  sendChange = async () => {
    if (this.props.route.params.name !== this.state.name){
      await changeName(this.props.route.params.username, this.state.name)
      this.props.changeNameAction(this.state.name)
    }
    this.props.navigation.goBack()
  }

  render() {
    return (
      <HideKeyboard>
      <View style={styles.container}>
      <View style={styles.content}>
        <View style={{padding: 15, alignItems: 'center'}}>
          <Text style={styles.headerText}>Change Name</Text>
          <Text style={styles.descriptionText}>Change the name that is displayed on your account.</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              autoCapitalize="none"
              placeholder="Name"
              keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
              underlineColorAndroid='transparent'
              onChangeText={(name) => {if (name.length < 21) this.setState({name})}}
              value={this.state.name}/>
          {this.state.name? <DeleteInput function={() => this.setState({name: ''})}/>: null}
        </View>
        {this.state.errMessage? <Text style={styles.errorText}>{this.state.errMessage}</Text>: null}
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.sendChange}>
          <Text style={styles.loginText}>Confirm</Text>
        </TouchableOpacity>
      </View>
      </View>
      </HideKeyboard>
    );
  }
}

export default connect(null, {changeNameAction: changeNameAction})(ChangeName)

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
