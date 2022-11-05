fo/*
Author: Ben Elpidius, bee6
Date: 23 Sept 2022
*/

import HomeScreen from "./screens/home";
import DetailsScreen from "./screens/details";
import Header from "./shared/header";
import About from "./screens/about";

import { Button, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Players">
        <Stack.Screen name="Players" component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
              <Header navigation={navigation}/>
          )
      })}
        />

        <Stack.Screen name="Details" component={DetailsScreen}
        options={({ navigation }) => ({
          headerRight: () => (
              <Header navigation={navigation}/>
          )
      })}/>

        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
