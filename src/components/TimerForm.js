import React, { Component } from 'react';
import { startTimer, resumeTimer, pauseTimer, resetTimer } from '../actions/actionCreator';
import soundFile from '../sound/analog-watch-alarm_daniel-simion.wav';

const ActiveTimer = props => (
  <div className="active-timer">
    <h2 className="active-timer-name">{props.name}</h2>
    <div className="display-timer">
      {props.completed ? "Done!" : `${props.remainderMinutes}:${props.remainderSeconds < 10 ? 0 : ''}${props.remainderSeconds}`}
    </div>
    <div className="buttons">
      {
        props.pause || !props.completed ? 
        <button className="pause-button" onClick={props.handleResume}>Resume</button>
        : 
        <button className="pause-button" onClick={props.handlePause}>Pause</button>
      }
      <button className="reset-button" onClick={props.handleReset}>Reset</button>
    </div>

  </div>
);

const SetTimer = props => (
  <div className="set-timer">
    <form onSubmit={props.onSubmit}>
      {
        props.editName ?
          <input type="text" name="name" onChange={props.onNameChange} /> :
          <h3 className="default-name" onClick={props.handleEditName}>{props.name} <i className="fa fa-pencil" aria-hidden="true"></i></h3>
      }
      <input
        type="text"
        name="minutes"
        value={props.minutes}
        placeholder="Enter Minutes"
        onChange={props.onTimeChange}
      />
      <button className="start-button">Start</button>
    </form>
  </div>
);

class TimerForm extends Component {
  constructor(props) {
    super(props);
    const timer = '';
    this.sound = new Audio(soundFile);
    this.state = {
      active: false,
      completed: false,
      name: this.props.defaultName,
      minutes: '',
      totalInSeconds: '',
      remainderMinutes: '',
      remainderSeconds: '',
      pause: false,
      editName: false,
    };
  }
  handleEditName = () => {
    this.setState(prevState => ({
      editName: true,
    }));
  }
  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  }
  onTimeChange = (e) => {
    const time = e.target.value;
    if(!time || time.match(/^\d{1,2}$/)) {
      this.setState(() => ({
        minutes: time,
        totalInSeconds: time * 60,
      }));
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(startTimer({
      name: this.state.name,
      seconds: this.state.totalInSeconds,
    }));
    this.setState({
      active: true,
      editName: false,
    });
    this.setUpTimer(this.state.totalInSeconds);
  }
  handlePause = () => {
    clearInterval(this.timer);

    this.setState ({
      name: this.state.name,
      totalInSeconds: this.state.remainderSeconds + (this.state.remainderMinutes * 60),
      pause: true,
    }, this.dispatchPause);
  }
  handleResume = () => {
    this.props.dispatch(resumeTimer({
      name: this.state.name,
      seconds: this.state.totalInSeconds,
    }));
    this.setState({
      active: true,
      pause: false,
    });
    this.setUpTimer(this.state.totalInSeconds);
  }
  dispatchPause = () => {
    this.props.dispatch(pauseTimer({
      name: this.state.name,
      seconds: this.state.totalInSeconds,
    }));
  }
  handleReset = () => {
    clearInterval(this.timer);
    this.setState({
      active: false,
      completed: false,
      name: this.props.defaultName,
      minutes: '',
      totalInSeconds: '',
      pause: false,
    });
    this.props.dispatch(resetTimer({
      name: this.state.name,
    }));
  }
  setUpTimer(seconds) {
    const now = Date.now();
    const end = now + seconds * 1000; 
    this.displayTimeLeft(seconds);

    this.timer = setInterval(() => {
      const secondsLeft = Math.round(((end - Date.now()) / 1000));
      if (secondsLeft < 0) {
        clearInterval(this.timer);
        this.setState({
          completed: true,
        });
        return;
      }
      this.displayTimeLeft(secondsLeft);
    }, 1000);
  }

  displayTimeLeft(seconds) {
    const remainderMinutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    this.setState({
      remainderMinutes,
      remainderSeconds,
    });
  }
  render() {
    console.log(this.state.totalInSeconds);
    return (
      <div className="timer-container">
      {this.state.active ?
        <ActiveTimer
          name={this.state.name}
          remainderMinutes={this.state.remainderMinutes}
          remainderSeconds={this.state.remainderSeconds}
          pause={this.state.pause}
          handlePause={this.handlePause}
          handleResume={this.handleResume}
          handleReset={this.handleReset}
          completed={this.state.completed}
        /> :
        <SetTimer
          name={this.state.name}
          minutes={this.state.minutes}
          editName={this.state.editName}
          handleEditName={this.handleEditName}
          onSubmit={this.onSubmit}
          onTimeChange={this.onTimeChange}
          onNameChange={this.onNameChange}
        />
        
      }
      </div>
    );
  }
}

export default TimerForm;


