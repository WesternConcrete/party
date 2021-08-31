import React from 'react';
import { Dimensions, StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import { logoutUser } from "./redux/actions"
import { connect } from 'react-redux'
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';


import UploadImage from './helperJS/UploadImage'

const MidLine = () => (
	<View style={{flexDirection: 'row'}}>
		<View style={{height: .25, width: '5%', backgroundColor: '#594D6C'}}/>
		<View style={{height: .25, width: '90%', backgroundColor: 'white', alignSelf: 'center'}}/>
		<View style={{height: .25, width: '5%', backgroundColor: '#594D6C'}}/>
	</View>
)


const RightLine = () => (
	<View style={{flexDirection: 'row'}}>
		<View style={{height: .25, width: '25%', backgroundColor: '#594D6C'}}/>
		<View style={{height: .25, width: '70%', backgroundColor: 'white', alignSelf: 'center'}}/>
		<View style={{height: .25, width: '5%', backgroundColor: '#594D6C'}}/>
	</View>
)

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const imageLink = "https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png"


class MainProfileScreen extends React.Component {

	render() {
		return(
			<ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
				
				<UploadImage image={this.props.image}/>


				<View style={{flexDirection: 'row'}}>
					<Text style={styles.usernameText}>{this.props.username}</Text>
				</View>






				<View style={styles.infoContainer}>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('ChangeName', {name: this.props.name, username: this.props.username})} style={[styles.infoValueTouchable, {borderTopRightRadius: 5, borderTopLeftRadius: 5, }] }>
						<Text style={styles.infoKey}>Name: </Text>
						<Text style={this.props.name? styles.infoValueExists: styles.infoValueDoesntExist}> {this.props.name || 'Name'} </Text>
        		<Ionicons style={{paddingRight: 5}} name={"chevron-forward"} color={'white'} size={30} />
					</TouchableOpacity>
					<RightLine/>
					<TouchableOpacity style={[styles.infoValueTouchable, {borderBottomRightRadius: 5, borderBottomLeftRadius: 5, }]} onPress={() => this.props.navigation.navigate('ChangeBirthday', {bday: this.props.bday, username: this.props.username})}>
						<Text style={styles.infoKey}>Birthday:</Text>
						<Text style={this.props.bday? styles.infoValueExists: styles.infoValueDoesntExist}> {this.props.bday_formatted || 'Birthday'} </Text>
						<Ionicons style={{paddingRight: 5}} name={"chevron-forward"} color={'white'} size={30} />
					</TouchableOpacity>
				</View> 



				<View style={styles.infoContainer}>
					<TouchableOpacity style={[styles.infoValueTouchable, {borderTopRightRadius: 5, borderTopLeftRadius: 5, borderBottomRightRadius: 5, borderBottomLeftRadius: 5, }]}>
						<Text style={[styles.infoKey, {fontWeight: 'bold'}]}>Blocked</Text>
						<Ionicons style={{paddingRight: 5}} name={"chevron-forward"} color={'white'} size={30} />
					</TouchableOpacity>
				</View> 

				

			  <TouchableOpacity style={styles.signOut} onPress={() => this.props.logoutUser()}>
			    	<Text style={styles.signOutText}>Sign Out</Text>
			  </TouchableOpacity>

		  </ScrollView>
		)
	}
}

const mapStateToProps = state => ({
  username: state.user.user,
  name: state.user.first_name,
  bday_formatted: state.user.birthday? months[Number(state.user.birthday.slice(0,2))-1] + ' ' + state.user.birthday.slice(3,5) + ' ' + state.user.birthday.slice(6): null,
  bday: state.user.birthday,
  image: state.user.profile_image || imageLink,
})


export default connect(mapStateToProps, {logoutUser})(MainProfileScreen)

const windowWidth = Dimensions.get('window').width

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
  },
  usernameText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    padding: 5,
  },
  infoContainer: {
  	borderRadius: 5,
  	width: '90%',
  	marginTop: 10,

  },
  separator: {
  	borderColor: 'white',
  	borderBottomWidth: .25,
  	width: '70%',
  	marginHorizontal: 10,
  	marginVertical: 5,
  	alignSelf: 'flex-end',
  	alignItems: 'center',
  	flexDirection: 'row',
  	justifyContent: 'center'

  },
  infoKey: {
  	marginLeft: 10,
  	color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  infoValueExists: {
  	color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    height: 20,
    flex: 3,
  },
  infoValueDoesntExist: {
  	opacity: .3,
  	color: '#fff',
    fontSize: 18,
    height: 20,
    flex: 3,
  },
  infoValueTouchable: {
  	backgroundColor: '#594D6C', 
  	height: 50, 
  	flexDirection: 'row', 
  	alignItems: 'center'
  },
  linkKey: {
  	marginTop: 7,
  	marginBottom: 15,
  	color: '#fff',
  	marginLeft: windowWidth/10 - windowWidth*.3,
    fontSize: 18,
    fontWeight: 'bold',
    height: 20,
    flex: 1,
  },
});