import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as Splashscreen from "expo-splash-screen";
import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Onboarding, Search, Location} from './screens'; 
import BottomTabNavigation from './navigation/BottomTabNavigation';
import { AuthProvider } from './components/AuthContext/AuthContext';
import { LocationAuthProvider } from './components/AuthContext/LocationAuthContext';
const Stack = createNativeStackNavigator()
export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/regular.otf'),
    medium: require('./assets/fonts/medium.otf'),
    bold: require('./assets/fonts/bold.otf'),
    light: require('./assets/fonts/light.otf'),
    xtrabold: require('./assets/fonts/xtrabold.otf'),
  });
  
  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded) {
      await Splashscreen.hideAsync();
    }
  }, {fontsLoaded});
  
  if(!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
    <LocationAuthProvider>
     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Onboard' component={Onboarding} options={ { headerShown : false } }/>
        <Stack.Screen name='Bottom' component={BottomTabNavigation} options={ { headerShown : false } }/>
        <Stack.Screen name='Search' component={Search} options={ { headerShown : false } }/>
      </Stack.Navigator>
     </NavigationContainer>
    </LocationAuthProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: 'xtrabold',
    fontSize: 18,
  },
});
