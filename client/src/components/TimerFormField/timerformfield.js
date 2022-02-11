import React from 'react'
import Utils from '../../utils/utils'

const TimerFormField = (props) => (
  <div className="col-12">
    <h1 className="text-center" data-cy="ElapsedTime">{Utils.formatTime(props.time)}</h1>
    <div className="row align-items-center">
      <div className="col-12 align-self-center text-center">
        <button
          className="btn btn-outline-secondary"
          onClick={props.startTimer}
          data-cy="StartTimerButton"
        >
          Start
        </button>
        <button className="btn btn-outline-secondary" onClick={props.stopTimer} data-cy="StopTimerButton">
          Stop
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={props.resetTimer}
          data-cy="ResetTimerButton"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
)

export default TimerFormField
