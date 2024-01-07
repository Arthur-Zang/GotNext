import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import reusable from '../../components/Reusable/reusable.styles'
import { AddTeam, HeightSpacer, ReusableText } from '../../components'
import { COLORS, SIZES, TEXT } from '../../constants/theme'
import {AntDesign} from '@expo/vector-icons'
import styles from './home.styles'
import Queue from '../../components/Home/Queue'
import Queue1 from '../../components/Home/Queue1'
import { useAuth } from '../../components/AuthContext/AuthContext'
import { useLocationAuth } from '../../components/AuthContext/LocationAuthContext'

const Home = ({ navigation }) => {
  const { user } = useAuth();
  const { selectedCourt } = useLocationAuth();
  return (
    <SafeAreaView style={reusable.container}>
      <View>
        <View style={reusable.rowWithSpace('space-between')}>
          <ReusableText 
            text={`Hey ${user ? user.username : 'User'}!`} // Use the username dynamically
            family = {"regular"}
            size={TEXT.large}
            color={COLORS.black}
          />
          <TouchableOpacity style={styles.box} 
          onPress={()=>navigation.navigate('Search')}>
            <AntDesign 
            name='search1'
            size={26}
            />
          </TouchableOpacity>
        </View>
        <ReusableText 
          text={selectedCourt ? selectedCourt.title : 'Court'}
          family = {"medium"}
          size={TEXT.large}
          color={COLORS.black}
        />
      </View>
      <Queue1 court={selectedCourt.id}/>
      <AddTeam court={selectedCourt.id}/>
    </SafeAreaView>
  )
}

export default Home