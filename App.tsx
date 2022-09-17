import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/views/Home";
import Details from "./src/views/Details";
import Submission from "./src/views/Submission";
import Explore from "./src/views/Explore";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/common";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Explore"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Submission" component={Submission} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
