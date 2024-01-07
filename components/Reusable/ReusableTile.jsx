import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ReusableText from './ReusableText'
import HeightSpacer from './HeightSpacer'
import { COLORS, TEXT, SIZES } from '../../constants/theme'
import reusable from './reusable.styles'
import ReusableButton from '../Buttons/ReusableButton'
import WidthSpacer from './WidthSpacer'
import { useAuth } from '../AuthContext/AuthContext' 

const ReusableTile = ({item}) => {
    const { user } = useAuth();
    const canJoinTeam = item.size < 5;
    const isMember = item.role !== "NONE"
    const joinTeam = async () => {
        try {
            // Retrieve the playerId from AsyncStorage
            const playerId = user.id

            // Call the backend to join the team
            const response = await fetch(`http://192.168.1.19:8080/api/teams/${item.id}/addPlayer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: playerId,
                }),
            });

            if (response.ok) {
                // Team joined successfully
                console.log('Joined team successfully');
            } else {
                // Handle error
                console.error('Error joining team');
            }
        } catch (error) {
            console.error('Error joining team:', error);
        }
    };
    const leaveTeam = async () => {
        try {
            // Retrieve the playerId from AsyncStorage
            const playerId = user.id

            const response = await fetch(`http://192.168.1.19:8080/api/teams/${item.id}/removePlayer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: playerId,
                }),
            });

            if (response.ok) {
                // Team left successfully
                console.log('Left team successfully');
            } else {
                // Handle error
                console.error('Error leaving team');
            }
        } catch (error) {
            console.error('Error leaving team:', error);
        }
    };
    const finishGame = async () => {
        try {
            const response = await fetch(`http://192.168.1.19:8080/api/teams/${item.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Team finished game and deleted successfully');
            } else {
                console.error('Error finishing game and deleting team');
            }
        } catch (error) {
            console.error('Error finishing game and deleting team:', error);
        }
    };
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
                text={item.leaderName}
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
                text={` (${item.size}) `}
                family = {"medium"}
                size={TEXT.small}
                color={COLORS.gray}
            />
            <HeightSpacer height={4}/>
            <View style={reusable.rowWithSpace("space-between")}>
                { canJoinTeam && isMember ? (
                    <>
                    <ReusableButton
                        onPress={leaveTeam}
                        btnText="Leave Team"
                        textColor={COLORS.lightWhite}
                        width={120}
                        backgroundColor={COLORS.red}
                        borderWidth={2}
                        borderColor={COLORS.lightRed}
                    />
                    <WidthSpacer width={10} />
                </>
                ) : (
                    <>
                    <ReusableButton
                        onPress= {joinTeam}
                        btnText = {"Join Team"}
                        textColor = {COLORS.lightWhite}
                        width = {100}
                        backgroundColor = {COLORS.green}
                        borderWidth = {2}
                        borderColor = {COLORS.lightGreen}
                    />
                    <WidthSpacer width ={10} />
                    </>
                )}
                <ReusableButton 
                    onPress= {finishGame}
                    btnText = {"Finished Game"}
                    textColor = {COLORS.lightWhite}
                    width = {120}
                    backgroundColor = {COLORS.red}
                    borderWidth = {2}
                    borderColor = {COLORS.lightRed}
                />
            </View>
        </View>
    </View>
  )
}

export default ReusableTile

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: COLORS.lightWhite,
        borderRadius: 12,
    }
})