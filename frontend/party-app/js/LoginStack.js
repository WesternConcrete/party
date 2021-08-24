import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

import SignInScreen from "./SignInScreen";
import createUsername from "./createUsernameScreen";
import createPassword from "./createPasswordScreen";
import pickName from "./pickNameScreen"
import createAccount from "./createAccountScreen"

const Stack = createStackNavigator();

const forFade = ({ current, closing }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

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
				          color="white"
				        />
		       		</TouchableOpacity>
    			),
            
        	})
    	}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ cardStyleInterpolator: forFade }}/>
      <Stack.Screen name="createUsername" component={createUsername} options={{ cardStyleInterpolator: forFade }}/>
      <Stack.Screen name="createPassword" component={createPassword} options={{ cardStyleInterpolator: forFade }}/>
      <Stack.Screen name="pickName" component={pickName} options={{ cardStyleInterpolator: forFade }}/>
      <Stack.Screen name="createAccount" component={createAccount} options={{ cardStyleInterpolator: forFade }}/>


    </Stack.Navigator>
  );
}
