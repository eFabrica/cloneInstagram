import React from 'react'
import Routes from './Route'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

export default function navinext() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}