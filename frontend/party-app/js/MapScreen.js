import React from 'react';
import { Animated, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Expo from "expo"
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

import {store} from "./redux/store"
import { updateLocation } from "./redux/actions.js"
import { connect } from 'react-redux'

import {API_HOME} from "./helperJS/api"
import mapStyle from "./mapstyle.js"
import Sidebars from "./mapview_sidebars.js"


class MapScreen extends React.Component {

	callNotif = false

	state = {
    notificationY: new Animated.Value(-100),
    notificationMessage: null,
    notificationLink: null
  };

  notificationProcess = async () => {
  	if(!this.props.userImage){
  		this.setState({notificationMessage: 'Click to set your profile picture.'})
  		this.callNotif = true
  	}
  	if(!this.props.userBday){
  		this.setState({notificationMessage: 'Click to set your birthday.'})
  		this.callNotif = true
  	}
  	if(this.props.userBday === null && this.props.userImage === null){
  		this.setState({notificationMessage: 'Click to set your birthday and profile picture.'})
  		this.callNotif = true
  	}
  	if(this.callNotif) {
  		this.fadeIn()
  	}
  	
  }

  fadeIn = () => {
    Animated.timing(this.state.notificationY, {
       toValue: 0,
       duration: 2000,
       useNativeDriver: true, 
     }
    ).start();
  };

  fadeOut = () => {
    Animated.timing(this.state.notificationY, {
      toValue: -100,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };
	
	_getLocationAsync = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({
      	accuracy: Location.Accuracy.Low
      });
			let coords = Object.assign({...this.props.location}, location.coords)
			this.props.updateLocation(coords)
			console.log(store.getState())
	}

	componentDidMount() {
		this._getLocationAsync()
		setTimeout(() => this.notificationProcess(), 3000)

	}

	_profileImage = () => {
		if (this.props.userImage !== null){
			return API_HOME + this.props.userImage
		} else {
			return "https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png"
		}
	}

	render() {
		return(
			<View style={styles.container} >
		    <MapView 
		        style={{ flex: 1 }}
		        rotateEnabled={false}
		        pitchEnabled={false}
		        provider="google"
		        region={this.props.location}
				    customMapStyle={mapStyle}
		    >
		    	<Marker coordinate={this.props.location}/> 
		    </MapView>
		    <Sidebars side='right'/>
		    <Sidebars side='left'/>
		    <Animated.View
		    	style={[styles.fadingContainer, {transform: [{translateY: this.state.notificationY}]}]}
        >
        	<TouchableOpacity style={styles.notification}>
          	<Text style={styles.fadingText}>{this.state.notificationMessage}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.fadeOut}>
          	<Ionicons style={{paddingRight: 5}} name={"close"} color={'black'} size={35} />
          </TouchableOpacity>
        </Animated.View>
		    <TouchableOpacity style={styles.recenter_map} onPress={() => {this._getLocationAsync(); console.log(API_HOME + this.props.userImage)}}>
		    	<Ionicons name={"navigate-circle"} color={'white'} size={40} />
		    </TouchableOpacity>
		    <TouchableOpacity style={styles.open_profile} onPress={() => this.props.navigation.navigate('MainProfileScreen')}>
		    	<ProfileImage path={this._profileImage()}/>
		    </TouchableOpacity>
			</View>
		)
	}
}

const mapStateToProps = state => ({
  location: state.location,
  userImage: state.user.userData.profile_image,
  userBday: state.user.userData.birthday,
})

export default connect(mapStateToProps, {updateLocation: updateLocation})(MapScreen)
//uri: "https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png"
//temporary \/\/\/
class ProfileImage extends React.Component { 
  render() {
	  return (
        <View style={styles.imageContainer}>
            <Image source={{uri: this.props.path}} style={{ width: 60, height: 60 }} />
        </View>
	   
	  )
  }
}
//^^^


const styles = StyleSheet.create({
  container: { 
  	flex: 1, 
  	position: 'relative',

  },
  imageContainer:{
        elevation:2,
        height:60,
        width:60, 
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  recenter_map: {
  	position: 'absolute', 
  	top: '5%',
  	left: "5%",
  	opacity:.85,
  },
  notification: {
		flex: 1,
  },
  open_profile: {
  	position: 'absolute', 
  	top: '5%',
  	right: "5%",
  }, 
  fadingContainer: {
  	position: 'absolute', 
  	alignSelf: 'center',
  	justifyContent: 'center',
  	alignItems: 'center',
  	top: '5%',
  	left:'17%',
  	backgroundColor: 'white',
  	width: '60%',
  	borderRadius: 10,
  	opacity:.5,
  	flexDirection: 'row',

	 },
  fadingText: {
    fontSize: 13,    
    fontWeight: 'bold',
    color : "#000",
    marginVertical: 5,
    marginLeft: 10,
  },
});