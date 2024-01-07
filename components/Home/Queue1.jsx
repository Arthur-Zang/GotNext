import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import ReusableText from '../Reusable/ReusableText'
import { TEXT, COLORS, SIZES } from '../../constants/theme'
import {Feather} from '@expo/vector-icons'
import ReusableTile from '../Reusable/ReusableTile'
import { useAuth } from '../../components/AuthContext/AuthContext';

const Queue1 = ({court}) => {
    const { user } = useAuth();
      const navigation = useNavigation();
      const [teams, setTeams] = useState([]);
      console.log("JaMorant", user.id, court)

      const fetchTeams = async () => {
        try {
        console.log(court);
          const response = await fetch(`http://192.168.1.19:8080/api/teams/all?playerId=${user.id}&courtId=${court}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch teams');
          }

          const teamsData = await response.json();
          console.log(teamsData)
          setTeams(teamsData);
        } catch (error) {
          console.error('Error fetching teams:', error);
          // Handle error
        }
      };

      useEffect(() => {
        // Fetch teams initially
        fetchTeams();

        // Poll for new teams every 30 seconds (adjust the interval as needed)
        const intervalId = setInterval(() => {
          fetchTeams();
        }, 30000); // 30 seconds

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
      }, []);
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <ReusableText 
            text={"Queue"}
            family = {"medium"}
            size={TEXT.large}
            color={COLORS.black}
        />
        <TouchableOpacity>

        </TouchableOpacity>
      </View>
      <FlatList
      data={teams}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{columnGap: SIZES.medium}}
      renderItem={({item}) => (
        <View style={{marginBottom: 10}}>
            <ReusableTile item={item} />
        </View>
      )}
      />
    </View>
  )
}

export default Queue1

const styles = StyleSheet.create({
    container: {
        height: 550,
        paddingTop: 30,
    },
    column: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
    }
})