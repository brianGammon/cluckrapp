/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { Linking } from 'react-native';
// $FlowFixMe
import firebase from 'react-native-firebase';

import Splash from '../Splash';
import RootNavigator from '../../navigation/RootNavigator';
import * as actions from '../../redux/actions';
import { metaTypes } from '../../redux/constants';
import { type UserSettings } from '../../types';

type Props = {
  getFlock: (flockId: string) => void,
  listenToUserSettings: (uid: string) => void,
  listenToChickens: (flockId: string) => void,
  listenToEggs: (flockId: string) => void,
  setInitialUrl: (url: string) => void,
  userSettings: {
    inProgress: boolean,
    error: string,
    data: UserSettings,
  },
};

type Event = {
  url: string,
};

type State = {
  initialized: boolean,
};

export class App extends React.Component<Props, State> {
  authUnsubscriber = null;

  constructor() {
    super();

    this.handleOpenURL = this.handleOpenURL.bind(this);

    this.state = {
      initialized: false,
    };
  }

  componentDidMount() {
    const { listenToUserSettings } = this.props;
    Linking.addEventListener('url', this.handleOpenURL);
    Linking.getInitialURL().then(url => url && this.handleOpenURL({ url }));

    this.authUnsubscriber = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ initialized: true });
      if (user) {
        console.log('Logged in, start listening');
        listenToUserSettings(user.uid);
      } else {
        console.log('Logged out, stop listening');
        // clear all listeners
      }
    });
  }

  // shouldComponentUpdate() {
  //   const { initialized } = this.state;
  //   if (!initialized) {
  //     return false;
  //   }
  //   return true;
  // }

  componentDidUpdate(prevProps: Props) {
    const prevUserSettings = prevProps.userSettings;
    const {
      userSettings, getFlock, listenToChickens, listenToEggs,
    } = this.props;
    const newFlocks = userSettings.data && userSettings.data.flocks;
    const newCurrentFlockId = userSettings.data && userSettings.data.currentFlockId;
    const oldFlocks = prevUserSettings.data && prevUserSettings.data.flocks;
    const oldCUrrentFlockId = prevUserSettings.data && prevUserSettings.data.currentFlockId;
    const flocksChanged = newFlocks !== oldFlocks;
    const currentFlockIdChanged = newCurrentFlockId !== oldCUrrentFlockId;
    console.log('DidUpdate');
    if (flocksChanged) {
      console.log('Flocks changed');
      // Dispatch to clear current flocks
      Object.keys(userSettings.data.flocks).forEach(key => getFlock(key));
    }

    if (currentFlockIdChanged) {
      console.log('Start listening to flock data');
      listenToChickens(newCurrentFlockId);
      listenToEggs(newCurrentFlockId);
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);

    if (this.authUnsubscriber) {
      this.authUnsubscriber();
    }
  }

  handleOpenURL = (event: Event) => {
    const { setInitialUrl } = this.props;
    setInitialUrl(event.url);
  };

  render() {
    const { initialized } = this.state;
    if (!initialized) {
      console.log('RENDERING SPLASH');
      return <Splash />;
    }
    console.log('RENDERING APP');
    return <RootNavigator />;
  }
}

const mapStateToProps = ({ userSettings }) => ({
  userSettings,
});
const mapDispatchToProps = dispatch => ({
  listenToUserSettings: uid => dispatch(actions.listenToUserSettings(uid)),
  listenToChickens: flockId => dispatch(actions.listenToChickens(flockId)),
  listenToEggs: flockId => dispatch(actions.listenToEggs(flockId)),
  getFlock: flockId => dispatch(actions.getFlock(flockId, metaTypes.flocks)),
  setInitialUrl: url => dispatch(actions.setInitialUrl(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
