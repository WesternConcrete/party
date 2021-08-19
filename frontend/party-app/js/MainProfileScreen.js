import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { loginUser } from "./redux/actions"
import { connect } from 'react-redux'



class MainProfileScreen extends React.Component {

	debug = async () => {
		console.log('fetching')
		const response = await fetch('http://127.0.0.1:8000/extended-users/', {
	    method: 'POST',
	    body: JSON.stringify({username: 'username', password: 'password'})
	  })
		const json = await response.json()
		console.log(json)
	}

	render() {
		return(
			<View style={styles.container}>
				<Text>MainProfileScreen</Text>
		    <Button title="Sign Out" onPress={() => this.props.loginUser(false)}/>
		   	<Button title="Debug" onPress={() => this.debug()}/>

		  </View>
		)
	}
}

export default connect(null, {loginUser: loginUser})(MainProfileScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});