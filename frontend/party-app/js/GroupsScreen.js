import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Constants from 'expo-constants';

export default class GroupsScreen extends React.Component {
	render() {
		return(
			<ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
		      <Text>Groups</Text>
		  </ScrollView>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#40364f',
    alignItems: 'center',
  },
  scrollContainer: {
  	flex: 1,
  	backgroundColor: '#40364f'
  },
});