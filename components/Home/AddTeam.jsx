import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import reusable from '../Reusable/reusable.styles';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from '../AuthContext/AuthContext'

const AddTeam = ({court}) => {
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [teamName, setTeamName] = useState('');
    const { user } = useAuth();

  const numberOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ];
  const createTeam = async () => {
          try {
              if (teamName.length < 3) {
                  // Team name is too short, handle accordingly
                  console.error('Team name is too short');
                  return;
              }

              // Create a new team with the specified name and size
              const response = await fetch('http://192.168.1.19:8080/api/teams/create', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      leaderId: user.id,
                      teamName: teamName,
                      size: selectedNumber,
                      court: court,
                  }),
              });

              if (response.ok) {
                  // Team created successfully
                  console.log('Team created successfully');
              } else {
                  // Handle error
                  console.error('Error creating team');
              }
          } catch (error) {
              console.error('Error creating team:', error);
          }
      };
  return (
    <View style={styles.teamNameWrapper}>
        <View behavior="padding" style={reusable.rowWithSpace("space-between")}>
            <TextInput
                style={styles.input}
                placeholder="Give a team name"
                value={{}}
                onChangeText={(text) => setTeamName(text)}
            />
            <View>
            <Dropdown
                style={styles.dropdown}
                dropdownPosition='top'
                data={numberOptions}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select item"
                searchPlaceholder="Search..."
                value={selectedNumber}
                onChange={item => {
                setSelectedNumber(item.value);
                }}
            />
            </View>
        </View>
        <Pressable onPress={createTeam}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </Pressable>
    </View>
      
  )
}

export default AddTeam


const styles = StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
        width: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
      },
      teamNameWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#C0C0C0',
      },
      input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        height: 50,
      },
      addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
      },
      addText: {
        fontSize: 24,
      },
})