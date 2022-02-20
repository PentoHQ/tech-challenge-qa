import React from 'react'
import TimerFormField from '../TimerFormField/timerformfield'

class TimerForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOn: false,
      time: 0,
      start: 0,
      name: null,
    }
  }

  submit() {
    if (this.state.time !== 0 && this.state.name !== null) {
      const newValues = Object.assign(
        {},
        { time: this.state.time, name: this.state.name }
      )
      this.props.onSubmit(newValues).then(() =>
        this.setState({
          isOn: false,
          time: 0,
          start: 0,
          name: null,
        })
      )
    }
  }

  onChangeName(event) {
    this.setState({
      name: event.target.value,
    })
  }

  startTimer() {
    if (!this.state.isOn) {
      this.setState({
        isOn: true,
        time: this.state.time,
        start: Date.now() - this.state.time,
      })
      this.timer = setInterval(() =>
        this.setState({
          time: Date.now() - this.state.start,
        })
      )
    }
  }

  stopTimer() {
    clearInterval(this.timer)
    this.setState({ isOn: false })
  }

  resetTimer() {
    this.setState({ isOn: false, time: 0 })
  }

  render() {
    return (
      <div className="form-row">
        <div className="form-group col-md-12">
          <label>New Session</label>
          <input
            className="form-control"
            name="name"
            placeholder="Enter Session Name"
            onChange={this.onChangeName.bind(this)}
            data-cy="inputSessionName"
          />
        </div>
        <div className="form-group col-md-12">
          <TimerFormField
            time={this.state.time}
            startTimer={this.startTimer.bind(this)}
            stopTimer={this.stopTimer.bind(this)}
            resetTimer={this.resetTimer.bind(this)}
          />
        </div>
        <button
          className="btn btn-primary btn-block"
          onClick={this.submit.bind(this)}
          disabled={this.state.isOn || !this.state.name || !this.state.time}
          data-cy="btnSave"
        >
          Save
        </button>
      </div>
    )
  }
}

export default TimerForm
