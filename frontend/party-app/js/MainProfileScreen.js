import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { logoutUser } from "./redux/actions"
import { connect } from 'react-redux'



class MainProfileScreen extends React.Component {

	render() {
		return(
			<View style={styles.container}>
				<Text>MainProfileScreen</Text>
		    <Button title="Sign Out" onPress={() => this.props.logoutUser()}/>
		  </View>
		)
	}
}

export default connect(null, {logoutUser})(MainProfileScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40364f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});