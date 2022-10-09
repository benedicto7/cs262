import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import { globalStyles } from '../styles/global';

function HomeScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getMonopoly = async () => {
        try {
         const response = await fetch('https://cs262-monopoly-service.herokuapp.com/players/');
         const json = await response.json();
         setData(json); // Remove .items
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
     }

     useEffect(() => {
        getMonopoly();
     }, []);

  return (
    <View style={globalStyles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
                <Text style={globalStyles.title}>{item.emailaddress}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

export default HomeScreen