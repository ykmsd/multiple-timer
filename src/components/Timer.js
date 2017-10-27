import React from 'react';
import { connect } from 'react-redux';
import TimerForm from './TimerForm';

const Timer = props => (
  <TimerForm
    {...props}
  />
);

export default connect()(Timer);
