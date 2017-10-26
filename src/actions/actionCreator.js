export const startTimer = ({
  name,
  seconds,
}) => ({
  type: 'START_TIMER',
  name,
  seconds,
});

export const resumeTimer = ({
  name,
  seconds,
}) => ({
  type: 'RESUME_TIMER',
  name,
  seconds,
});

export const pauseTimer = ({
  name,
  seconds,
}) => ({
  type: 'PAUSE_TIMER',
  name,
  seconds,
});

export const resetTimer = ({
  name,
}) => ({
  type: 'RESET_TIMER',
  name,
});

