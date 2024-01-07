import { View, Text, Image } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TopInfo, TopLocations, TopTeams } from '../screens';
import { COLORS, SIZES } from '../constants/theme';
import { AppBar, HeightSpacer, NetworkImage, ReusableText} from '../components';
import styles from "./topTab.styles";
import { useAuth } from '../components/AuthContext/AuthContext';

const Tab = createMaterialTopTabNavigator();


const TopTabNavigation = () => {
    const { user } = useAuth();
  return (
    <View style={{flex: 1}}>
        <View style={{backgroundColor: COLORS.lightWhite}}>
            <View>
                <NetworkImage 
                    source={"https://media.istockphoto.com/id/1292401641/photo/orange-basketball-ball-on-wooden-parquet-close-up-image-of-basketball-ball-over-floor-in-the.jpg?s=612x612&w=0&k=20&c=Z1w1_emnpzTzuT1H-u6BP19YWaJMR8vXr6qtcXqbH0E="}
                    width={'100%'}
                    height={300}    
                    radius={0}
                />
                <AppBar 
                    color={COLORS.white}
                    icon={"logout"}
                    color1={COLORS.white}
                    onPress1={() => {}}
                />
                <View style={styles.profile}>
                    <Image source={{uri: "https://st4.depositphotos.com/21607914/23698/i/450/depositphotos_236988962-stock-photo-stephen-curry-golden-state-warriors.jpg"}}
                    style={styles.image}/>
                    <HeightSpacer height={5} />
                    <View style={styles.name}>
                        <View style={{alignItems: "center"}}>
                            <ReusableText 
                                text={user ? user.username : 'User'}
                                family={"medium"}
                                size={SIZES.medium}
                                color={COLORS.white}
                            />
                        </View>
                    </View>
                    <HeightSpacer height={5} />
                    <View style={styles.name}>
                        <View style={{alignItems: "center"}}>
                            <ReusableText 
                                text={user ? user.email : 'email'}
                                family={"medium"}
                                size={SIZES.medium}
                                color={COLORS.white}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
      <Tab.Navigator>
        <Tab.Screen name='Teams' component={TopTeams}/>
        <Tab.Screen name='Locations' component={TopLocations}/>
        <Tab.Screen name='Info' component={TopInfo}/>
      </Tab.Navigator>
    </View>
  )
}

export default TopTabNavigation