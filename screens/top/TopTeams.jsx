import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { ReusableTile1 } from '../../components';
import { SIZES } from '../../constants/theme';

const TopTeams = () => {
  const teams =  [
    {
        "_id": "64c631650298a05640539adc",
        "team_size": "4",
        "title": "Curry's Team",
        "owner_id": "64c631650298a05640539adc",
        "owner_name": "Curry",
        "time": Date,
        "members": {},
    },
    {
        "_id": "64c631650298a05640539adc",
        "team_size": "5",
        "title": "Curry's Team",
        "owner_id": "64c631650298a05640539adc",
        "owner_name": "Curry",
        "time": Date,
        "members": {},
    },
    {
        "_id": "64c631650298a05640539adc",
        "team_size": "4",
        "title": "Curry's Team",
        "owner_id": "64c631650298a05640539adc",
        "owner_name": "Curry",
        "time": Date,
        "members": {},
    },
    {
        "_id": "64c631650298a05640539adc",
        "team_size": "4",
        "title": "Curry's Team",
        "owner_id": "64c631650298a05640539adc",
        "owner_name": "Curry",
        "time": Date,
        "members": {},
    },
];
  return (
    <View style={{margin: 20}}>
      <FlatList 
      
      data={teams}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{columnGap: SIZES.medium}}
      renderItem={({item}) => (
        <View style={{marginBottom: 10}}>
          <ReusableTile1 item={item} />
        </View>
      )}
      />
    </View>
  )
}

export default TopTeams

const styles = StyleSheet.create({

})