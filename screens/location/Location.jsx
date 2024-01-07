import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, {Marker} from 'react-native-maps'
import { useLocationAuth } from '../../components/AuthContext/LocationAuthContext'

const Location = ({navigation}) => {
    const [allCourts, setAllCourts] = useState([]);
    const { selectedCourt, setSelectedCourtAsync } = useLocationAuth();

    useEffect(() => {
    const fetchAllCourts = async () => {
      try {
        const response = await fetch('http://192.168.1.19:8080/api/courts/all');

        if (response.ok) {
          const courtsData = await response.json();
          console.log(courtsData)
          setAllCourts(courtsData);
        } else {
          console.error('Error fetching all courts');
        }
      } catch (error) {
        console.error('Error fetching all courts:', error);
      }
    };

    fetchAllCourts();
    }, []); // Empty dependency array to run the effect only once on component mount


  const handleMarkerPress = async (court) => {
      try {
        // Store the selected court in AsyncStorage using the context
        await setSelectedCourtAsync(court);
        navigation.navigate('Home');
      } catch (error) {
        console.error('Error storing selected court:', error);
      }
  };
  return (
    <MapView style={styles.mapStyle}>
        {allCourts.map((court) => (
          <Marker
            key={court.id}
            coordinate={{
              latitude: court.latitude,
              longitude: court.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            title={court.title}
            onPress={() => handleMarkerPress(court)}
          />
        ))}
    </MapView>
  )
}

export default Location

const styles = StyleSheet.create({
  mapStyle: {
    ...StyleSheet.absoluteFillObject
  }
})