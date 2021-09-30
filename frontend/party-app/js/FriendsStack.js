import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

import FriendsScreen from "./FriendsScreen.js"
import FindFriendsScreen from "./FindFriendsScreen.js"

const Stack = createStackNavigator();

export default function FriendsStack() {
  return (
    <Stack.Navigator
    	screenOptions={({ navigation, route }) => ({
            headerShown: false,
        	})
    	}
    >
      <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
      <Stack.Screen name="FindFriendsScreen" component={FindFriendsScreen} />


    </Stack.Navigator>
  );
}
