const { h, render, Component } = require('preact')
const Clock = require('./components/Clock')
require('./static/reg.js')
class App extends Component {
  render () {
    return <Clock />
  }
}

render(<App />, document.getElementById('root'))
