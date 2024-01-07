import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { HeightSpacer, ReusableText, ReusableButton } from '../../components'
import { TEXT, COLORS, SIZES } from '../../constants/theme'

const Removed = ({navigation}) => {
  return (
    <View>
      <View style={{marginTop: '40%'}}>
        <Image style={styles.image}source={require('../../assets/images/icons/failed.png')} />
        <HeightSpacer height={40}/>
        <View style={{alignItems: "center"}}>
            <ReusableText 
                text={'You are now removed from the queue!'}
                family = {"medium"}
                size={TEXT.xLarge}
                color={COLORS.black}
            />
            <HeightSpacer height={20}/>
            <ReusableText 
                text={'You either finished your game or moved away from the area'}
                family = {"regular"}
                size={TEXT.medium}
                color={COLORS.gray}
            />
            <HeightSpacer height={20}/>
            <ReusableButton 
                onPress= {()=>navigation.navigate("Bottom")}
                btnText = {"Done"}
                textColor = {COLORS.white}
                width = {SIZES.width-50}
                backgroundColor = {COLORS.red}
                borderWidth = {0}
                borderColor = {COLORS.red}
            />
        </View>
      </View>
    </View>
  )
}

export default Removed

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
        resizeMode: "contain",
    }
})