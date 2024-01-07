import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Registration, SignIn } from '../screens';
import { COLORS } from '../constants/theme';
import { HeightSpacer, NetworkImage } from '../components';

const Tab = createMaterialTopTabNavigator();

const AuthTopTab = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <ScrollView style={{flex: 1, backgroundColor: COLORS.lightWhite}} >
            <HeightSpacer height={80} />
            <NetworkImage 
                source={"https://media.istockphoto.com/id/1292401641/photo/orange-basketball-ball-on-wooden-parquet-close-up-image-of-basketball-ball-over-floor-in-the.jpg?s=612x612&w=0&k=20&c=Z1w1_emnpzTzuT1H-u6BP19YWaJMR8vXr6qtcXqbH0E="}
                width={'100%'}
                height={250}    
                radius={0}
            />
            <View style={{height: 600}}>
                <Tab.Navigator>
                    <Tab.Screen name='SignIn' component={SignIn}/>
                    <Tab.Screen name='Registration' component={Registration}/>
                </Tab.Navigator>
            </View>
        </ScrollView>
    </View>
  )
}

export default AuthTopTab