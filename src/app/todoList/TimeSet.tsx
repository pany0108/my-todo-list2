import React, { Component } from 'react';
import { LocalizationProvider, TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';
import { observer } from 'mobx-react';
import { TodoListStore } from '~/app/service';

interface State {
  timeValue: any;
}

@observer
class TimeSet extends Component {
  state:State={
    timeValue: '',
  }

  render() {
    const { timeValue } = this.state;

    return (
      <>
        <LocalizationProvider dateAdapter={ AdapterDateFns }>
          <TimePicker
            value={ TodoListStore.time === '' ? new Date() : timeValue }
            onChange={ (newTimeValue: any) => {
              TodoListStore.getTime(newTimeValue);
              this.setState({ timeValue: newTimeValue });
            } }
            disabled={ TodoListStore.allDay }
            renderInput={ (params: any) => <TextField { ...params } /> }
          />
        </LocalizationProvider>

      </>
    );
  }
}

export default TimeSet;
