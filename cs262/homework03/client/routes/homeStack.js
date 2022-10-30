import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Header from '../shared/header';
import Home from '../screens/home';
import ReviewDetails from '../screens/reviewDetails';

const Stack = createStackNavigator();
export default function HomeStack( {navigation} ) {
    return (
        <Stack.Navigator 
            screenOptions={{headerStyle:{backgroundColor:'#ddd', height: 60}, headerTintColor: '#444'}}>
            <Stack.Screen
                name="GameZone"
                component={Home}
                options={{
                    headerLeft: () =>  <Header navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="ReviewDetails"
                component={ReviewDetails}
                options={{title: 'Review Details'}}
            />
        </Stack.Navigator>
    );
};
