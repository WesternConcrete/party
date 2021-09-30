import React from 'react';
import { StyleSheet, Text, View, FlatList, Platform, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux'
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';


import HideKeyboard from "./helperJS/dismissKeyboard"
import { findFriends } from "./helperJS/api"
import FindFriendView from "./helperJS/FindFriendView"

const MidLine = () => (
	<View style={{flexDirection: 'row'}}>
		<View style={{height: 1, width: '5%'}}/>
		<View style={{height: 1, width: '90%', backgroundColor: 'white', opacity: .1, alignSelf: 'center'}}/>
		<View style={{height: 1, width: '5%'}}/>
	</View>
)

class FindFriendsScreen extends React.Component {
	state = {
		search: "",
		loading: false,
		data: null,
	}

	getResults = async (search) => {
		this.setState({search}, () => {
			if(this.state.search !== ""){
				this.setState({loading: true}, () => {
					findFriends(search).then(({data}) => {
						const filtered_data = data.filter(obj => {
							return !(this.props.currentFriends.includes(obj.username) || this.props.user === (obj.username))
						}).sort((a, b) => {
		        // orders data to prioritize and show the search bar value
		        if(a.username.toLowerCase().indexOf(this.state.search.toLowerCase()) > b.username.toLowerCase().indexOf(this.state.search.toLowerCase())) {
		            return 1;
		        } else if (a.username.toLowerCase().indexOf(this.state.search.toLowerCase()) < b.username.toLowerCase().indexOf(this.state.search.toLowerCase())) {
		            return -1;
		        } else if (a.name.toLowerCase().indexOf(this.state.search.toLowerCase()) < b.name.toLowerCase().indexOf(this.state.search.toLowerCase())) {
		            return -1;
		        } else if (a.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > b.name.toLowerCase().indexOf(this.state.search.toLowerCase())) {
		            return 1;
		        }})	
						this.setState({data: filtered_data}, () => {
							this.setState({loading: false})
						})
					})
				})
			} else {
				this.setState({data: null})
			}
		})
	}

	searchBar = () => (
		<View>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<TouchableOpacity
			        onPress={() => this.props.navigation.goBack()}
			   		  style={{marginLeft: 10}}
			       	>
			       		<Ionicons
				          name="chevron-back-outline"
				          size={40}
				          color="white"
				        />
		    </TouchableOpacity>
				<SearchBar
					inputContainerStyle={{backgroundColor: '#594D6C', borderRadius: 13, height: 40}}
					inputStyle={{color: '#d0d0d0'}}
					placeholderTextColor={'#d0d0d0'}
					searchIcon={{color: '#d0d0d0'}}
					clearIcon={{color: '#d0d0d0'}}
					containerStyle={{backgroundColor: 'transparent', borderTopWidth: 0, borderBottomWidth: 0,width:'85%'}}
		      placeholder="Type in username"
		      onChangeText={this.getResults}
		      value={this.state.search}
		    />
	    </View>
	    <MidLine/>
    </View>
	)

	render() {
		return(
			//<HideKeyboard>
				<View style={styles.container}>
				      <FlatList
				      	ListHeaderComponent={this.searchBar}
				      	windowSize={10}
				      	style={{marginBottom: 50}}
				        data={this.state.data}
				        keyExtractor={item => item.username}
				        ItemSeparatorComponent={
							    Platform.OS !== 'android' &&
							    (
							    	() => <MidLine/>
							    )
							  }
				        renderItem={({ item }) => (
				          <FindFriendView loading={this.state.loading} friend={item}/>
				        )}
				      />
			  </View>
		  //</HideKeyboard>
		)
	}
}

const mapStateToProps = state => ({
  user: state.user.user,
  currentFriends: state.user.friends
})

export default connect(mapStateToProps)(FindFriendsScreen)

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