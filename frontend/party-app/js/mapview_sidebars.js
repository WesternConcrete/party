import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


export default function Sidebars(props) { 
	switch(props.side) {
	  case 'right':
	   	return(<View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: Dimensions.get('window').width - 35, backgroundColor: 'transparent' }}></View>)
	  case 'left':
	   	return(<View style={{ position: 'absolute', top: 0, bottom: 0, right: Dimensions.get('window').width - 35, left: 0, backgroundColor: 'transparent' }}></View>)
	  default:
	  	return(null)
	}
}