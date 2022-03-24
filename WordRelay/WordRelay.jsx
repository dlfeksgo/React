const React = require('react');
const { Component } = React;

class WordRelay extends Component {
	state = {
		test: 'Hello, World',
	};
	render() {
		return <h1>{this.state.test}</h1>;
	}
}

module.exports = WordRelay;
