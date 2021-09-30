import React from 'react';
import { StyleSheet, Text, View, FlatList, Platform, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux'
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';


import FriendView from "./helperJS/FriendView"

const MidLine = () => (
	<View style={{flexDirection: 'row'}}>
		<View style={{height: 1, width: '5%'}}/>
		<View style={{height: 1, width: '90%', backgroundColor: 'white', opacity: .1,alignSelf: 'center'}}/>
		<View style={{height: 1, width: '5%'}}/>
	</View>
)

class FriendsScreen extends React.Component {
	state = {
		search: "",
	}

	searchBar = () => (
		<View>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				
				<SearchBar
					inputContainerStyle={{backgroundColor: '#594D6C', borderRadius: 13, height: 40}}
					inputStyle={{color: '#d0d0d0'}}
					placeholderTextColor={'#d0d0d0'}
					searchIcon={{color: '#d0d0d0'}}
					clearIcon={{color: '#d0d0d0'}}
					containerStyle={{backgroundColor: 'transparent', borderTopWidth: 0, borderBottomWidth: 0,width:'90%'}}
		      placeholder="Search"
		      onChangeText={search => this.setState({search})}
		      value={this.state.search}
		    />
		    <TouchableOpacity onPress={() => this.props.navigation.navigate('FindFriendsScreen')}>
		    	<Ionicons name={"person-add-outline"} color={'#fff'} size={24} />
		    </TouchableOpacity>
	    </View>
	    <MidLine/>
    </View>
	)

	filterData = (arr) => {
		const array =	arr.filter(friend => {
    	if(friend.username.toLowerCase().includes(this.state.search.toLowerCase())) return true;
    	if(friend.name.toLowerCase().includes(this.state.search.toLowerCase())) return true;
    	return false
   	}).sort((a, b) => {
        // Sort results by matching name with keyword position in name
        if(a.username.toLowerCase().indexOf(this.state.search.toLowerCase()) > b.username.toLowerCase().indexOf(this.state.search.toLowerCase())) {
            return 1;
        } else if (a.username.toLowerCase().indexOf(this.state.search.toLowerCase()) < b.username.toLowerCase().indexOf(this.state.search.toLowerCase())) {
            return -1;
        } else if (a.name.toLowerCase().indexOf(this.state.search.toLowerCase()) < b.name.toLowerCase().indexOf(this.state.search.toLowerCase())) {
            return -1;
        } else if (a.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > b.name.toLowerCase().indexOf(this.state.search.toLowerCase())) {
            return 1;
        }})	
   	return array
	}

	render() {
		return(
				<View style={styles.container}>
						{this.props.friendData?
				      <FlatList
				      	ListHeaderComponent={this.searchBar}
				      	windowSize={10}
				      	style={{marginBottom: 50}}
				        data={this.filterData(this.props.friendData)}
				        keyExtractor={item => item.username}
				        ItemSeparatorComponent={
							    Platform.OS !== 'android' &&
							    (
							    	() => <MidLine/>
							    )
							  }
				        renderItem={({ item }) => (
				          <FriendView friend={item}/>
				        )}
				      />: null
			    	}
			  </View>
		)
	}
}

const mapStateToProps = state => ({
  friendData: state.user.friendData,
})

export default connect(mapStateToProps)(FriendsScreen)

const styles = StyleSheet.create({
  container: {
  	flex: 1,
    backgroundColor: '#40364f',
  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700'
  },
  listItem: {
    marginTop: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%'
  },
  listItemText: {
    fontSize: 18
  },
});