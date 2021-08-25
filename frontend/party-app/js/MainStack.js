import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux'


import MainProfileScreen from "./MainProfileScreen.js"
import MapScreen from './MapScreen.js';
import MainTabNav from "./MainTabNav.js"

import LoginStack from "./LoginStack"

const Stack = createStackNavigator();

const forFade = ({ current, closing }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

class MainStack extends React.Component {
  render() {
	  return (
	    <NavigationContainer>
	    	{ this.props.user.userData? 
		    <Stack.Navigator
		        screenOptions={({ navigation, route }) => ({
		            headerShown: route.name !== "MainTabNav",
		            headerTitle: '',
				    		headerTransparent: true,
		            headerLeft: () => (
			    			<TouchableOpacity
					          onPress={() => navigation.goBack()}
					   		  style={{paddingLeft: 10}}
					       	>
					       		<Ionicons
						          name="chevron-back-outline"
						          size={48}
						          color="white"
						        />
				       		</TouchableOpacity>
		    			),
		            
		        	})
		    	}
		    >
		      <Stack.Screen name="MainTabNav" component={MainTabNav} options={{ cardStyleInterpolator: forFade }}/>
		      <Stack.Screen name="MainProfileScreen" component={MainProfileScreen} options={{ cardStyleInterpolator: forFade }}/>
		    </Stack.Navigator>:
		    <LoginStack/>
		  	}
	    </NavigationContainer>
  	);
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(MainStack)


