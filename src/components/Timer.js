import React from 'react';
import { connect } from 'react-redux';
import TimerForm from './TimerForm';
import { addTimer } from '../actions/actionCreator';

const Timer = props => (
  <TimerForm
    {...props}
  />
);

export default connect()(Timer);
