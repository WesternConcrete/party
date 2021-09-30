import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';

import FriendsTabNav from "./FriendsTabNav";
import MapScreen from './MapScreen.js';
import FriendsScreen from './FriendsScreen.js';
import PartysScreen from './PartysScreen.js';

const Tab = createMaterialTopTabNavigator()

function Placeholder() {
  return(
    <View style={styles.placeholder}/>
  )
}

export default function MainTabNav() {
  return ( 

        <Tab.Navigator style={styles.container}
          initialRouteName="Map"
          screenOptions={({ route }) => ({
            tabBarStyle: { 
              backgroundColor: 'black',
              opacity: .8,
              position: 'absolute',
              width: '100%',
              bottom: 0,
              height: 50,
            },
            
            lazy: true,
            lazyPlaceholder: Placeholder,
            tabBarLabelStyle: {fontSize: 10, color: "white" },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              switch (route.name) {
                case 'Map':
                  focused? iconName = 'map': iconName = 'map-outline';
                  break;
                case 'People':
                  focused? iconName = 'people': iconName = 'people-outline';
                  break;
                case 'Partys':
                  focused? iconName = 'beer': iconName = 'beer-outline';
                  break;
                default:
                  break;
              }

              return <Ionicons style={focused? {opacity:1}:{opacity:.45}} name={iconName} color={'white'} size={24} />;
            },
          })}
          tabBarPosition= 'bottom'

        >
          <Tab.Screen name="Partys" component={PartysScreen} options={{tabBarLabel: ''}}/>
          <Tab.Screen name="Map" component={MapScreen} options={{tabBarLabel: ''}}/>
          <Tab.Screen name="People" component={FriendsTabNav} options={{tabBarLabel: ''}}/>
          


        </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  placeholder: {
    backgroundColor: '#40364f',
    flex: 1,
  },
  
});
