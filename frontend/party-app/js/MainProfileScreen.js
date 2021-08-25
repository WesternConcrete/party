import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import { logoutUser } from "./redux/actions"
import { connect } from 'react-redux'
import Constants from 'expo-constants';

import UploadImage from './helperJS/UploadImage'

class MainProfileScreen extends React.Component {

	render() {
		return(
			<ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
				<UploadImage/>
				<Text style={styles.usernameText}>{this.props.username}</Text>


			  <TouchableOpacity style={styles.signOut} onPress={() => this.props.logoutUser()}>
			    	<Text style={styles.signOutText}>Sign Out</Text>
			  </TouchableOpacity>
		  </ScrollView>
		)
	}
}

const mapStateToProps = state => ({
  username: state.user.userData.user,
  name: state.user.userData.first_name,
})

export default connect(mapStateToProps, {logoutUser})(MainProfileScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight+50,
    backgroundColor: '#40364f',
    alignItems: 'center',
  },
  scrollContainer: {
  	flex: 1,
  	backgroundColor: '#40364f'
  },
  signOut: {
  	position: 'absolute',
  	bottom: '5%',
  	right: "10%",
  }, 
  signOutText: {
    color: '#fff',
    fontSize: 24,
    textDecorationLine: 'underline',
  },
  usernameText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    padding: 5,
  },
  separator: {
  	backgroundColor: '#fff',
  	height: '10%',
  	marginHorizontal: 10,
  }
});