/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import FlockSelectorRenderer from './FlockSelectorRenderer';
import { type Flock, type UserSettings } from '../../types';
import { firebaseUpdateRequested } from '../../redux/actions';
import { actionTypes, metaTypes } from '../../redux/constants';

type Props = {
  flocks: {
    [flockId: string]: Flock,
  },
  userSettings: UserSettings,
  userId: string,
  saveUserSettings: (userId: string, userSettings: UserSettings) => void,
  unlinkFlock: (
    userId: string,
    userSettings: UserSettings,
    flockId: string,
  ) => void,
  deleteFlock: (
    userId: string,
    userSettings: UserSettings,
    flockId: string,
  ) => void,
};

class FlockSelector extends React.Component<Props> {
  handleSelectFlock = (flockId) => {
    const { userId, userSettings, saveUserSettings } = this.props;
    const newUserSettings = { ...userSettings, currentFlockId: flockId };
    saveUserSettings(userId, newUserSettings);
  };

  handleUnlinkFlock = (flockId) => {
    const { userId, userSettings, unlinkFlock } = this.props;
    unlinkFlock(userId, userSettings, flockId);
  };

  handleDeleteFlock = (flockId) => {
    const { userId, userSettings, deleteFlock } = this.props;
    deleteFlock(userId, userSettings, flockId);
  };

  render() {
    const {
      flocks,
      userId,
      userSettings: { currentFlockId },
    } = this.props;
    return (
      <FlockSelectorRenderer
        flocks={flocks}
        currentFlockId={currentFlockId}
        userId={userId}
        handleSelectFlock={this.handleSelectFlock}
        handleUnlinkFlock={this.handleUnlinkFlock}
        handleDeleteFlock={this.handleDeleteFlock}
      />
    );
  }
}

const mapStateToProps = ({ flocks, userSettings, auth: { user } }) => ({
  flocks: flocks.data,
  userSettings: userSettings.data,
  userId: user ? user.uid : '',
});

const mapDispatchToProps = dispatch => ({
  saveUserSettings: (userId: string, userSettings: UserSettings) => dispatch(
    firebaseUpdateRequested({ userId, userSettings }, metaTypes.userSettings),
  ),
  unlinkFlock: (userId: string, userSettings: UserSettings, flockId: string) => dispatch({
    type: actionTypes.UNLINK_FLOCK_REQUESTED,
    payload: { userId, userSettings, flockId },
  }),
  deleteFlock: (userId: string, userSettings: UserSettings, flockId: string) => dispatch({
    type: actionTypes.DELETE_FLOCK_REQUESTED,
    payload: { userId, userSettings, flockId },
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlockSelector);
