import React from 'react';
import {
  AsyncStorage, ActivityIndicator, StatusBar, View,
} from 'react-native';
import styles from './styles';

export interface Props {
  navigation: any;
}

export interface State {}

export default class AuthLoadingScreen extends React.Component<Props, State> {
  // Fetch the token from storage then navigate to our appropriate place
  async componentDidMount() {
    const { navigation } = this.props;
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigation.navigate(userToken ? 'App' : 'Auth');
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
