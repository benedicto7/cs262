import { View, Text } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/global';

function DetailsScreen({ route, navigation }) {

  return (
      <View style={globalStyles.container}>
          {/* Display the fields of the received player object. */}
          <Text style={globalStyles.title}>{ route.params.emailaddress }</Text>
          <Text>ID: { route.params.id }</Text>
          <Text>Aka: { (route.params.name !== null) ? (route.params.name) : (null)} </Text>
      </View>
  );
}

export default DetailsScreen