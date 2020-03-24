
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'

import Feed from './screens/Feed'
import AddPhoto from "./screens/AddPhoto"
import Profile from "./screens/Profile"
import Login from "./screens/Login"
import Register from './screens/Register'

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  return (
    <Tab.Navigator
      lazy={false}
      tabBarOptions={{ showLabel: false }}>

      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <Icon name={'home'} size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddPhoto"
        component={AddPhoto}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <Icon name={'camera'} size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          // tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name={'user'} size={30} color={color} />
          ),
        }}
      />

    </Tab.Navigator >
  );
}