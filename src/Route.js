import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/FontAwesome'
import Login from "./screens/Login";
import Register from './screens/Register'

import TabNavigator from './TabNavigator';

const Stack = createStackNavigator()

export default function Routes() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            mode={"card"}
            headerMode={"none"}
        >

            <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: 'Login', unmountOnBlur: true }}
            />

            <Stack.Screen
                name="Register"
                component={Register}
                options={{ title: 'Register', unmountOnBlur: true }}
            />

            <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{ title: 'TabNavigator' }}
            />

        </Stack.Navigator >
    );
}




