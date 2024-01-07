import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ReusableText from './ReusableText'
import HeightSpacer from './HeightSpacer'
import { COLORS, TEXT, SIZES } from '../../constants/theme'

const ReusableTile1 = ({item}) => {
  return (
    <View style={styles.container}>
        <View>
            <ReusableText 
                text={item.title}
                family = {"medium"}
                size={SIZES.medium}
                color={COLORS.black}
            />
            <HeightSpacer height={8}/>
            <ReusableText 
                text={item.owner_name}
                family = {"medium"}
                size={TEXT.small}
                color={COLORS.gray}
            />
            <HeightSpacer height={8}/>
            <ReusableText 
                text={item.time}
                family = {"medium"}
                size={TEXT.small}
                color={COLORS.gray}
            />
            <HeightSpacer height={8}/>
            <ReusableText 
                text={` (${item.team_size}) `}
                family = {"medium"}
                size={TEXT.small}
                color={COLORS.gray}
            />
            <HeightSpacer height={4}/>
        </View>
    </View>
  )
}

export default ReusableTile1

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: COLORS.lightWhite,
        borderRadius: 12,
    }
})