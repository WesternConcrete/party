import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';

import MapScreen from './MapScreen.js';
import FriendsScreen from './FriendsScreen.js';
import PartysScreen from './PartysScreen.js';

const Tab = createMaterialTopTabNavigator()

export default function MainTabNav() {
  return ( 

        <Tab.Navigator
          initialRouteName="Map"
          screenOptions={({ route }) => ({
            tabBarStyle: { 
              backgroundColor: 'black',
              borderRadius: 20,
              opacity: .8,
              position: 'absolute',
              width: '100%',
              bottom: -20,
              height: 85,
            },
            tabBarLabelStyle: { fontSize: 10, color: "white" },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              switch (route.name) {
                case 'Map':
                  focused? iconName = 'map': iconName = 'map-outline';
                  break;
                case 'Friends':
                  focused? iconName = 'people': iconName = 'people-outline';
                  break;
                case 'Partys':
                  focused? iconName = 'beer': iconName = 'beer-outline';
                  break;
                default:
                  break;
              }

              return <Ionicons name={iconName} color={'white'} size={24} />;
            }
          })}
          tabBarPosition= 'bottom'
        >
          <Tab.Screen name="Friends" component={FriendsScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Partys" component={PartysScreen} />


        </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarBackground: {
    position: 'absolute', 
    backgroundColor: 'black',
    opacity: .6,
    borderRadius: 20,
    width: "100%",
    height: "10%",
    bottom: 50,
  },
  
});
