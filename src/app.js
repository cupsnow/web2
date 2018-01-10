import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import './base.css';
import './func.less';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import * as Ctrl from './ctrl';

class DatePickerEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return <button className='flat date_entry'
      onClick={this.props.onClick}>
      {this.props.value}
    </button>;
  }
}

DatePickerEntry.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateMoment: moment(),
      dateInput: ''
    };
    this.state.dateInput = Ctrl.formatDateInput(this.state.dateMoment.toDate());

    this.setUIState = this.setUIState.bind(this);
  }

  setUIState(key, val) {
    console.log(`set ${key}: ${val}`);
    var state = this.state;
    state[key] = val;
    if (key === 'dateInput') {
      state.dateMoment = moment(Ctrl.parseDateInput(val));
    } else if (key === 'dateMoment') {
      state.dateInput = Ctrl.formatDateInput(val.toDate());
    }
    this.setState(state);
  }

  render() {
    return (<div>
      {this.state.dateMoment.toDate().toString()}
      <DatePicker className='title'
        dateFormat='YYYY/MM/DD'
        selected={this.state.dateMoment}
        onChange={(val) => this.setUIState('dateMoment', val)}/>
      <DatePicker customInput={<DatePickerEntry/>} dateFormat='YYYY/MM/DD'
        selected={this.state.dateMoment}
        onChange={(val) => this.setUIState('dateMoment', val)}/>
      <input type='date' value={this.state.dateInput}
        onChange={(ev) => this.setUIState('dateInput', ev.target.value)}/>

    </div>);
  }
}

var holder = document.createElement('div');
document.body.appendChild(holder);
ReactDOM.render((<App/>), holder);
