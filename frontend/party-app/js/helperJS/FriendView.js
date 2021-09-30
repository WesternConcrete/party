import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';

import HideKeyboard from "./dismissKeyboard"
import { getFriendInfo, API_HOME } from "./api"

const imageLink = "https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png"


export default class FriendView extends React.Component {

  state = {
    status: 'friend', 
  }
	// async componentDidMount() {
	// 	const json = await getFriendInfo(this.props.friend)
	// 	this.setState({name: json.name, url: json.url})
	// }

	render() {
		return(
          <View style={this.props.loading? styles.loadingListItem:styles.listItem}>
          	<Image style={styles.profileImage} source={{ uri: this.props.friend.url? API_HOME + this.props.friend.url: imageLink}}/>
          	<View>
          		<Text style={styles.usernameText}>{this.props.friend.username}</Text>
          		<Text style={styles.nameText}>{this.props.friend.name}</Text>

          	</View>
            
            {this.state.status === 'friend'? 
              <TouchableWithoutFeedback onPress={() => this.setState({status: 'unfriended'})}>
                <View style={styles.statusFriend}><Text style={styles.statusText}>Remove</Text></View>
              </TouchableWithoutFeedback>
            : null}

            {this.state.status === 'unfriended'? 
              <TouchableWithoutFeedback onPress={() => this.setState({status: 'requested'})}>
                <View style={styles.statusUnfriended}><Text style={styles.statusTextUnadded}>Add</Text></View>
              </TouchableWithoutFeedback>
            : null}

            {this.state.status === 'requested'? 
              <TouchableWithoutFeedback onPress={() => this.setState({status: 'friend'})}>
                <View style={styles.statusFriend}><Text style={styles.statusText}>Requested</Text></View>
              </TouchableWithoutFeedback>
            : null}

          </View>     
		)
	}
}

const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40364f',
    alignItems: 'center',
  },
  statusFriend: {
    width: 100, height: 30, backgroundColor: 'rgba(254, 254, 254, 0.2)', position: 'absolute', right: '5%', borderRadius: 7, justifyContent: 'center', alignItems: 'center'
  },
  statusUnfriended: {
    width: 100, height: 30, backgroundColor: '#fff', position: 'absolute', right: '5%', borderRadius: 7, justifyContent: 'center', alignItems: 'center'
  },
  statusText: {
    fontWeight: 'bold', color: '#fff'
  },
  statusTextUnadded: {
    fontWeight: 'bold'
  },
  profileImage: { 
  	width: 50, 
  	height: 50, 
  	borderRadius: 100, 
  	marginRight: 15,
  },
  listItem: {
    padding: 12,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    borderRadius: 20,
  },
  loadingListItem: {
    padding: 12,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    borderRadius: 20,
    opacity: .3,
  },
  usernameText: {
    fontSize: 18,
    color: '#fff',
  },
  nameText: {
    fontSize: 14,
    color: '#fff',
    opacity: .55,
  },
});