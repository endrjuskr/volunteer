import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./src/views/Home";
import Details from "./src/views/Details";
import Submittion from "./src/views/Submittion";
import Explore from "./src/views/Explore";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Home2" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Submittion" component={Submittion} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
