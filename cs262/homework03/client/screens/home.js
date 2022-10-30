import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, FlatList } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';

export default function Home({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://cs262-service.herokuapp.com/player_playergame')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View style={globalStyles.container}>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList 
                    data={data}
                    keyExtractor={({ id }, index) => id.toString()}
                    renderItem={({ item }) => (
                        <Card>
                            <Text style={globalStyles.titleText}>Player: { item.name == null ? "N/A" : item.name }</Text>
                            <Text style={globalStyles.titleText}>Email: { item.emailaddress }</Text>
                            <Text style={globalStyles.titleText}>Game: { item.gameid }</Text>
                            <Text style={globalStyles.titleText}>Score: { item.score }</Text>
                            <Text style={globalStyles.titleText}>{ item.currentlocation == null ? "Game ended" 
                                                                    : "Currently at " + item.currentlocation }</Text>
                        </Card>
                    )} 
                />
            )}
        </View>
    );
};
