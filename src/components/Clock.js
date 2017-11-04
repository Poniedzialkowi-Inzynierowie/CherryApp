const { h, render, Component } = require('preact') // eslint-disable-line no-unused-vars

class Clock extends Component {
  constructor () {
    super()
    this.state.time = Date.now()
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      this.setState({ time: Date.now() })
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render (props, state) {
    const time = new Date(state.time).toLocaleTimeString()
    return <div id='clock'>{ time }</div>
  }
}

module.exports = Clock
