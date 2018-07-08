import React from 'react';
import { Text, Button, View } from 'react-native';

export default class ChickenEditor extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Add or Edit Chicken</Text>
        <Button onPress={() => navigation.goBack()} title="Go Back" />
      </View>
    );
  }
}
