import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';
import React from 'react';
import { globalStyles } from '../styles/global';

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
      <View style={globalStyles.container}>
          {/* Get rid of that ugly button and, instead, display our list of movies. */}
          <FlatList data={reviews} renderItem={({ item })=> (
              <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
                  <Text style={globalStyles.title}>{ item.title }</Text>
              </TouchableOpacity>
          )} />
      </View>
  );
}

export default HomeScreen