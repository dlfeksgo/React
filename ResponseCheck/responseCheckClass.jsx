import React, { Component } from 'react';

class ResponseCheck extends Component {
	state = {
		state: 'waiting',
		message: '준비가 되면 클릭해주세요😀',
		result: [],
	};

	timeId;
	startTime;
	endTime;

	onClickScreen = () => {
		const { state } = this.state;
		switch (state) {
			case 'waiting':
				this.setState({
					state: 'ready',
					message: '초록 화면이 되면 클릭해주세요',
				});
				this.startTime = new Date();
				this.timeId = setTimeout(() => {
					this.setState({
						state: 'now',
						message: '지금이야!',
					});
				}, Math.floor(Math.random() * 1000) + 1000);
				break;
			case 'ready':
				this.setState({
					state: 'waiting',
					message: '성급했어~',
				});
				clearTimeout(this.timeId);
				break;
			case 'now':
				this.endTime = new Date();
				this.setState((prevState) => {
					return {
						state: 'waiting',
						message: '준비가 되면 클릭해주세요😀',
						result: [...prevState.result, this.endTime - this.startTime],
					};
				});
		}
	};

	render() {
		const { state, message, result } = this.state;
		return (
			<>
				<div id="screen" className={state} onClick={this.onClickScreen}>
					{message}
				</div>
				<div>
					{result.length === 0 ? null : (
						<div>평균 {result.reduce((a, b) => a + b) / result.length} ms</div>
					)}
				</div>
			</>
		);
	}
}

export default ResponseCheck;
