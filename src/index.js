const { h, render, Component } = require('preact')
const Test = require('./components/Test')
require('./static/reg.js')
class App extends Component {
  render () {
    return <Test />
  }
}

render(<App />, document.getElementById('root'))
