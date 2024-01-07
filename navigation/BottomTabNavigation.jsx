import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Profile, Chat, Location, First, Removed } from '../screens';
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from '../constants/theme';
import TopTabNavigation from './TopTabNavigation';
import AuthTopTab from './AuthTopTab';
const Tab = createBottomTabNavigator();

const tabBarStyle = {
    padding: 20,
    borderRadius: 10,
    height: 80,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
}

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
    initialRouteName='Home'
    activeColor='#EB6A58'
    tabBarHideKeyboard={true}
    headerShown = {false}
    inactiveColor='#3e2465'
    barStyle={{paddingBottom: 48}}>
        <Tab.Screen 
        name="Home" component={Home} options = {
            {
                tabBarStyle: tabBarStyle,
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Ionicons 
                        name={focused ? "grid" : "grid-outline"}
                        color={focused ? COLORS.red : COLORS.gray}
                        size={26}
                    />
                )
            }
        }/>
        <Tab.Screen 
        name="Location" component={Location} options = {
            {
                tabBarStyle: tabBarStyle,
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Ionicons 
                        name={focused ? "location" : "location-outline"}
                        color={focused ? COLORS.red : COLORS.gray}
                        size={26}
                    />
                )
            }
        }/>
        <Tab.Screen 
        name="Chat" component={AuthTopTab} options = {
            {
                tabBarStyle: tabBarStyle,
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Ionicons 
                        name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"}
                        color={focused ? COLORS.red : COLORS.gray}
                        size={26}
                    />
                )
            }
        }/>
        <Tab.Screen 
        name="Profile" component={TopTabNavigation} options = {
            {
                tabBarStyle: tabBarStyle,
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Ionicons 
                        name={focused ? "person" : "person-outline"}
                        color={focused ? COLORS.red : COLORS.gray}
                        size={26}
                    />
                )
            }
        }/>
    </Tab.Navigator>
  )
}

export default BottomTabNavigation