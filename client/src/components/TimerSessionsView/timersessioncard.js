import React from 'react'
import Utils from '../../utils/utils'

const TimerSessionCard = (props) => (
  <div className="card" data-cy="SavedSessionCard">
    <div className="card-body">
      <h5 className="card-title">{props.name}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{props.createdAt}</h6>
      <p className="card-text">Duration: {Utils.formatTime(props.time)}</p>
    </div>
  </div>
)

export default TimerSessionCard
