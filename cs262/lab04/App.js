/*
Author: Ben Elpidius, bee6
Date: 23 Sept 2022
*/

import { Button, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => {
//           /* 1. Navigate to the Details route with params */
//           navigation.navigate('Details', {
//             itemId: 86,
//             otherParam: 'anything you want here',
//           });
//         }}
//       />
//     </View>
//   );
// }

// function DetailsScreen({ route, navigation }) {
//   /* 2. Get the param */
//   const { itemId, otherParam } = route.params;
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//       <Text>itemId: {JSON.stringify(itemId)}</Text>
//       <Text>otherParam: {JSON.stringify(otherParam)}</Text>
//       <Button
//         title="Go to Details... again"
//         onPress={() =>
//           navigation.push('Details', {
//             itemId: Math.floor(Math.random() * 100),
//           })
//         }
//       />
//       <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

function HomeScreen({ navigation }) {

  /* Hardcode a "database"/list of movies. */
  const [reviews, setReviews] = useState([
      { title: "Fellowship of the Ring", rating: 8.8, key: '1',
          description: "Some hobbits begin a quest."},
      { title: "Two Towers", rating: 8.7, key: '2',
          description: 'Some dark lords try to take over the world.'},
      { title: "Return of the King", rating: 8.9, key: '3',
          description: 'The dark lords are defeated, to much rejoicing.'},
  ]);

  return (
      <View style={{ flex: 1, padding: 20}}>
          {/* Get rid of that ugly button and, instead, display our list of movies. */}
          <FlatList data={reviews} renderItem={({ item })=> (
              <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
                  <Text>{ item.title }</Text>
              </TouchableOpacity>
          )} />
      </View>
  );
}

function DetailsScreen({ route, navigation }) {

  return (
      <View style={{ flex: 1, padding: 20}}>
          {/* Display the fields of the received movie object. */}
          <Text>{ route.params.title }</Text>
          <Text>{ route.params.rating }</Text>
          <Text>{ route.params.description }</Text>
      </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options='Overview'/>
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
