const { h, render, Component } = require('preact');
const Test = require('./components/Test');

class App extends Component {
    render() {
        return <Test />;
    }
}

render(<App />, document.getElementById('root'));
