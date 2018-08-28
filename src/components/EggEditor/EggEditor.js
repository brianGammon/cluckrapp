/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { FormBuilder, Validators } from 'react-reactive-form';
import EggEditorRenderer from './EggEditorRenderer';
import { nowAsMoment } from '../../utils/dateHelper';
import { type Chicken, type Egg, type Navigation } from '../../types';
import { metaTypes, actionTypes } from '../../redux/constants';
import {
  firebaseUpdateRequested,
  firebaseCreateRequested,
} from '../../redux/actions';
import {
  dateInRangeValidator,
  weightRangeValidator,
} from '../../utils/validators';

type Props = {
  inProgress: boolean,
  error: string,
  chickenId: string,
  chickens: {
    [chickenId: string]: Chicken,
  },
  eggId: string,
  egg: Egg,
  flockId: string,
  navigation: Navigation,
  defaultDate: string,
  userId: string,
  saveForm: (payload: { flockId: string, eggId?: string, data: Egg }) => void,
  clearError: () => void,
};

class EggEditor extends React.Component<Props> {
  form = FormBuilder.group({
    damaged: [false],
    chickenId: ['', Validators.required],
    chickenName: [''],
    date: ['', [Validators.required, dateInRangeValidator]],
    notes: [''],
    weight: [
      '',
      [Validators.pattern(/^\d+([.]\d{0,1})?$/), weightRangeValidator],
    ],
  });

  componentDidMount() {
    const {
      chickenId, defaultDate, egg, chickens,
    } = this.props;
    let defaultState = {
      ...this.form.value,
      chickenId: chickenId || '',
      chickenName: chickenId ? chickens[chickenId].name : '',
      date: defaultDate,
    };

    if (egg) {
      const { userId, modified, ...rest } = egg;
      defaultState = { ...defaultState, ...rest };
    }
    this.form.controls.damaged.setValue(defaultState.damaged);
    this.form.controls.chickenId.setValue(defaultState.chickenId);
    this.form.controls.chickenName.setValue(defaultState.chickenName);
    this.form.controls.date.setValue(defaultState.date);
    this.form.controls.notes.setValue(defaultState.notes);
    this.form.controls.weight.setValue(defaultState.weight);
  }

  componentDidUpdate(prevProps) {
    const prevInProgress = prevProps.inProgress;
    const { inProgress, error, navigation } = this.props;
    if (!inProgress && prevInProgress && !error) {
      navigation.goBack();
    }
  }

  componentWillUnmount() {
    const { error, clearError } = this.props;
    if (error) {
      clearError();
    }
  }

  onSaveForm = () => {
    const {
      egg, userId, flockId, eggId, saveForm,
    } = this.props;
    const data = {
      ...egg,
      ...this.form.value,
      modified: moment().toISOString(),
      userId,
    };
    const payload = { flockId, eggId, data };
    saveForm(payload);
  };

  handlePickItem = (itemValue) => {
    const { chickens } = this.props;
    const { chickenId: control } = this.form.controls;
    control.setValue(itemValue);
    control.markAsTouched();

    this.form.controls.chickenName.setValue(
      chickens[itemValue] ? chickens[itemValue].name : 'Unknown',
    );
  };

  render() {
    const { navigation, chickens, error } = this.props;

    return (
      <EggEditorRenderer
        navigation={navigation}
        chickens={chickens}
        form={this.form}
        handlePickItem={this.handlePickItem}
        onSaveForm={this.onSaveForm}
        error={error}
      />
    );
  }
}

const mapStateToProps = (
  {
    chickens, userSettings, eggs, auth: { user },
  },
  { navigation },
) => {
  const chickenId = navigation.getParam('chickenId', null);
  const eggId = navigation.getParam('eggId', null);
  const defaultDate = navigation.getParam('date', null);
  return {
    chickenId,
    chickens: chickens.data,
    eggId,
    egg: eggId ? eggs.data[eggId] : {},
    flockId: userSettings.data.currentFlockId,
    userId: user ? user.uid : '',
    defaultDate: defaultDate || nowAsMoment().format('YYYY-MM-DD'),
    inProgress: eggs.inProgress,
    error: eggs.error,
  };
};

const mapDispatchToProps = dispatch => ({
  saveForm: (payload) => {
    if (payload.eggId) {
      return dispatch(firebaseUpdateRequested(payload, metaTypes.eggs));
    }
    return dispatch(firebaseCreateRequested(payload, metaTypes.eggs));
  },
  clearError: () => dispatch({ type: actionTypes.CLEAR_ERROR, meta: { type: metaTypes.eggs } }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EggEditor);
