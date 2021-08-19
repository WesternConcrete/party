import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
    	screenOptions={({ navigation, route }) => ({
            headerShown: route.name !== "SignIn",
            headerTitle: '',
		    		headerTintColor: '#fff',
		    		headerTransparent: true,
            headerLeft: () => (
	    			<TouchableOpacity
			          onPress={() => navigation.goBack()}
			   		  style={{paddingLeft: 10}}
			       	>
			       		<Ionicons
				          name="chevron-back-outline"
				          size={48}
				          color="black"
				        />
		       		</TouchableOpacity>
    			),
            
        	})
    	}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
