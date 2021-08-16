import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class FriendsScreen extends React.Component {
	render() {
		return(
			<View style={styles.container}>
		      <Text>Friends</Text>
		    </View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});