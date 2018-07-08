import React from 'react';
import { Text, Button, View } from 'react-native';

export default class Calendar extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Month Calendar</Text>
        <Button onPress={() => navigation.navigate('Day')} title="Today's Eggs" />
      </View>
    );
  }
}