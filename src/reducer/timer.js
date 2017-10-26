const timerReducerDefaultState = [];

export default (state = timerReducerDefaultState, action) => {
  switch (action.type) {
    case 'START_TIMER':
      return [
        ...state, {
          name: action.name,
          seconds: action.seconds,
        }];
    case 'RESUME_TIMER': {
      const index = state.findIndex(timer => timer.name === action.name);
      return [
        ...state.slice(0, index),
        { name: action.name, seconds: action.seconds },
        ...state.slice(index + 1),
      ];
    }
    case 'PAUSE_TIMER': {
      const index = state.findIndex(timer => timer.name === action.name);
      return [
        ...state.slice(0, index),
        { name: action.name, seconds: action.seconds },
        ...state.slice(index + 1),
      ];
    }
    case 'RESET_TIMER': {
      const index = state.findIndex(timer => timer.name === action.name);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ];
    }
    default:
      return state;
  }
};
