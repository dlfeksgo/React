// import React, { Component } from 'react';

// class Try extends Component {
// 	render() {
// 		return (
// 			<li>
// 				<div>{this.props.value.try}</div>
// 				<div>{this.props.value.result}</div>
// 			</li>
// 		);
// 	}
// }

// export default Try;

import React from 'react';

const Try = ({ tryInfo }) => {
	return (
		<li>
			<div>{tryInfo.try}</div>
			<div>{tryInfo.result}</div>
		</li>
	);
};
export default Try;
