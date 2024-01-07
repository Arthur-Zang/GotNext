import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { HeightSpacer, ReusableText, ReusableButton } from '../../components'
import { TEXT, COLORS, SIZES } from '../../constants/theme'

const First = ({navigation}) => {
  return (
    <View>
      <View style={{marginTop: '40%'}}>
        <Image style={styles.image}source={require('../../assets/images/icons/checked.png')} />
        <HeightSpacer height={40}/>
        <View style={{alignItems: "center"}}>
            <ReusableText 
                text={'You are now first in line!'}
                family = {"medium"}
                size={TEXT.xLarge}
                color={COLORS.black}
            />
            <HeightSpacer height={20}/>
            <ReusableText 
                text={'Please prepare, you got next!'}
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
                backgroundColor = {COLORS.green}
                borderWidth = {0}
                borderColor = {COLORS.green}
            />
        </View>
      </View>
    </View>
  )
}

export default First

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
        resizeMode: "contain",
    }
})