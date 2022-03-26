const React = require('react');
const { Component } = React;

class WordRelay extends Component {
	state = {
		word: '감자탕',
		value: '',
		result: '',
	};
	render() {
		return <h1>{this.state.word}</h1>;
	}
}

module.exports = WordRelay;
