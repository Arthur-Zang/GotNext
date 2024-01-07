import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView, Keyboard, ScrollView } from 'react-native';
import Team from './Team';
import HeightSpacer from '../Reusable/HeightSpacer';

export default function Queue() {
  const [team, setTeam] = useState('');
  const [teamArray, setTeamArray] = useState([]);

  const handleAddTeam = () => {
    Keyboard.dismiss();
    setTeamArray([...teamArray, team]);
    setTeam('');
  };

  const finishedGame = (index) => {
    let itemsCopy = [...teamArray];
    itemsCopy.splice(index, 1);
    setTeamArray(itemsCopy);
  };

  return (
    <View>
      {/* Queue */}
      <View>
        <ScrollView style={queueStyles.scrollView} contentContainerStyle={queueStyles.scrollViewContent}>
          {/* Queue */}
          <View style={queueStyles.teamsWrapper}>
            <View style={queueStyles.items}>
              {teamArray.map((team, index) => (
                <Pressable key={index} onPress={() => finishedGame(index)}>
                  <Team text={team} />
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      {/* Create a team */}
      <KeyboardAvoidingView behavior="padding" style={queueStyles.teamNameWrapper}>
        <TextInput
          style={queueStyles.input}
          placeholder="Give a team name"
          value={team}
          onChangeText={(text) => setTeam(text)}
        />

        <Pressable onPress={handleAddTeam}>
          <View style={queueStyles.addWrapper}>
            <Text style={queueStyles.addText}>+</Text>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}

const queueStyles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
    },
  teamsWrapper: {
    paddingHorizontal: 20,
    height: 500,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    height: '100%',
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
    width: 250,
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
});