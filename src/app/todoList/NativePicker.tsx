import { LocalizationProvider, DesktopDatePicker, TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { TodoListStore } from '~/app/service';

@observer
class NativePicker extends Component {
  render() {
    const { date, time } = TodoListStore;

    return (
      <>
        <LocalizationProvider dateAdapter={ AdapterDateFns }>
          <DesktopDatePicker
            inputFormat="MM/dd/yyyy"
            value={ date }
            onChange={ (newDateValue: any) => {
              TodoListStore.getToday(newDateValue);
            } }
            renderInput={ (params: any) => (
              <TextField
                { ...params }
                style={ { width: '150px', marginRight: '1rem' } }
              />
            ) }
          />
          <TimePicker
            value={ time }
            onChange={ (newTimeValue: any) => {
              TodoListStore.getTime(newTimeValue);
            } }
            disabled={ TodoListStore.allDay }
            renderInput={ (params: any) => (
              <TextField
                { ...params }
                style={ { width: '130px' } }
              />
            ) }
          />
        </LocalizationProvider>
      </>
    );
  }
}
export default NativePicker;
