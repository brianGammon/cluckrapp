import React from 'react';
import moment from 'moment';
import {
  DatePicker as NBDatePicker, View, Button, Icon,
} from 'native-base';

type Props = {
  clearable: boolean,
  value: Date | null,
  maximumDate: Date | null,
  onDateChange: (date: Date) => void,
};

class DatePicker extends React.Component<Props> {
  datePickerRef = React.createRef();

  handleClearDate = () => {
    this.datePickerRef.current.setState({ chosenDate: undefined }, () => {
      this.datePickerRef.current.props.onDateChange(null);
    });
  };

  render() {
    const {
      clearable, value, onDateChange, maximumDate,
    } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#D9D5DC',
        }}
      >
        <View style={{ flex: 1 }}>
          <NBDatePicker
            ref={this.datePickerRef}
            defaultDate={value}
            // minimumDate={new Date(2018, 1, 1)}
            maximumDate={maximumDate}
            locale="en"
            // timeZoneOffsetInMinutes={value.getTimezoneOffset()}
            modalTransparent
            animationType="fade"
            androidMode="default"
            placeHolderText="Hatched On"
            // textStyle={{ color: 'green' }}
            placeHolderTextStyle={{ color: 'grey' }}
            onDateChange={onDateChange}
            formatChosenDate={date => moment(date).format('MMM DD, YYYY')}
          />
        </View>
        {value
          && clearable && (
            <Button transparent onPress={this.handleClearDate}>
              <Icon name="close-circle" />
            </Button>
        )}
      </View>
    );
  }
}

export default DatePicker;