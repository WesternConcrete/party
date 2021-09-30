import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'

import {loadFriendRequest} from './helperJS/api'
import FriendsStack from './FriendsStack.js';
import GroupsScreen from './GroupsScreen.js';

const Tab = createMaterialTopTabNavigator()

function Placeholder() {
  return(
    <View style={styles.placeholder}/>
  )
}

function FormatCounter(num) {
  if(num < 1000) return num
  if(num < 10000) return (num/1000).toFixed(2) + 'K'
  if(num < 100000) return (num/1000).toFixed(1) + 'K'
  if(num < 1000000) return (num/1000).toFixed(0) + 'K'
  if(num < 10000000) return (num/1000000).toFixed(2) + 'M'
  if(num < 100000000) return (num/1000000).toFixed(1) + 'M'
  if(num < 1000000000) return (num/1000000).toFixed(0) + 'M'
  return num
}

class FriendsTabNav extends React.Component {
  // async componentDidMount() {
  //   const {friend_requests} = await loadFriendRequest(this.props.user)
    
  // }

  render() { 
    return ( 
        <Tab.Navigator
          initialRouteName="Friends"
          screenOptions={({ route }) => ({
            tabBarStyle: { 
              width: '100%',
              backgroundColor: '#000'
            },
            lazy: true,
            lazyPlaceholder: Placeholder,
            tabBarLabelStyle: { marginTop: Constants.statusBarHeight, fontSize: 14, color: "#fff", fontWeight: 'bold' },
            }
          )}
        >
          <Tab.Screen name="Friends" component={FriendsStack} options={{tabBarLabel: FormatCounter(this.props.friendsLength) + ' Friends'}}/>
          <Tab.Screen name="Groups" component={GroupsScreen} options={{tabBarLabel: FormatCounter(this.props.groupsLength) + ' Groups'}}/>


        </Tab.Navigator>
    );
  }
}
//if add friend is not working to change numbers, remove .length 
const mapStateToProps = state => ({
  friendsLength: state.user.friends.length,
  groupsLength: state.user.groups.length,
  user: state.user.user
})

export default connect(mapStateToProps)(FriendsTabNav)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    backgroundColor: '#40364f',
    flex: 1,
  },
});