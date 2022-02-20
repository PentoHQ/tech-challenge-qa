import React from 'react'
import Utils from '../../utils/utils'

const TimerFormField = (props) => (
  <div className="col-12">
    <h1 className="text-center" data-cy="timerValue">{Utils.formatTime(props.time)}</h1>
    <div className="row align-items-center">
      <div className="col-12 align-self-center text-center">
        <button
          className="btn btn-outline-secondary"
          onClick={props.startTimer}
          data-cy="btnStartTimer"
        >
          Start
        </button>
        <button 
          className="btn btn-outline-secondary" 
          onClick={props.stopTimer}
          data-cy="btnStopTimer"
        >
          Stop
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={props.resetTimer}
          data-cy="btnResetTimer"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
)

export default TimerFormField
