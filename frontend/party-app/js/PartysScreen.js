import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class PartysScreen extends React.Component {
	render() {
		return(
			<View style={styles.container}>
		      <Text>Partys</Text>
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