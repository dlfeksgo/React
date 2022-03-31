import React, { Component } from 'react';

class Try extends Component {
	render() {
		return (
			<li>
				{this.props.value.fruit} - {this.props.value.taste}
			</li>
		);
	}
}

export default Try;
