import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Timer from './Timer';
import store from '../store';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTimer: 0,
    }
  }
  incrementTimer = () => {
    this.setState(prevState => ({
      activeTimer: prevState.activeTimer++,
    }));
  }
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <div className="timers-container">
            <Timer defaultName="Timer 1" />
            <Timer defaultName="Timer 2" />
            <Timer defaultName="Timer 3" />
            <Timer defaultName="Timer 4" />
          </div>
        </div>
      </Provider>
    );
  }
}

export default View;
