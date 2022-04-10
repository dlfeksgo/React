import React, { Component } from 'react';

const IMG_URL = './public/assets/rsp.png';
const rspCoords = {
	scissors: '0',
	rock: '-220px',
	paper: '-440px',
};

class RspGame extends Component {
	state = {
		result: '',
		imgCoord: 0,
		score: 0,
	};

	interval;
	clickable = true;

	componentDidMount() {
		console.log('어디보자');
		this.interval = setInterval(this.computerChange, 50);
	}

	UNSAFE_componentWillMount() {
		console.log('삭제');
		// clearInterval(this.interval);
	}

	computerChange = () => {
		const { imgCoord } = this.state;
		if (imgCoord === rspCoords.scissors) {
			this.setState({
				imgCoord: rspCoords.rock,
			});
		} else if (imgCoord === rspCoords.rock) {
			this.setState({
				imgCoord: rspCoords.paper,
			});
		} else {
			this.setState({
				imgCoord: rspCoords.scissors,
			});
		}
	};

	onClickBtn = (e) => {
		if (!this.clickable) {
			return;
		}
		clearInterval(this.interval);
		this.clickable = false;
		const myChoice = e.target.id;
		const { imgCoord } = this.state;
		if (myChoice === 'scissors') {
			switch (imgCoord) {
				case rspCoords.scissors:
					this.setState({
						result: '비겼습니다.',
					});
					break;
				case rspCoords.rock:
					this.setState((prevState) => {
						return {
							result: '졌습니다.',
							score: prevState.score - 1,
						};
					});
					break;
				case rspCoords.paper:
					this.setState((prevState) => {
						return {
							result: '이겼습니다.',
							score: prevState.score + 1,
						};
					});
					break;
			}
		} else if (myChoice === 'rock') {
			switch (imgCoord) {
				case rspCoords.scissors:
					this.setState((prevState) => {
						return {
							result: '이겼습니다.',
							score: prevState.score + 1,
						};
					});
					break;
				case rspCoords.rock:
					this.setState({
						result: '비겼습니다.',
					});
					break;
				case rspCoords.paper:
					this.setState((prevState) => {
						return {
							result: '졌습니다.',
							score: prevState.score - 1,
						};
					});
					break;
			}
		} else if (myChoice === 'paper') {
			switch (imgCoord) {
				case rspCoords.scissors:
					this.setState((prevState) => {
						return {
							result: '졌습니다.',
							score: prevState.score - 1,
						};
					});
					break;
				case rspCoords.rock:
					this.setState((prevState) => {
						return {
							result: '이겼습니다.',
							score: prevState.score + 1,
						};
					});
					break;
				case rspCoords.paper:
					this.setState({
						result: '비겼습니다.',
					});
					break;
			}
		}
		setTimeout(() => {
			this.interval = setInterval(this.computerChange, 50);
			this.clickable = true;
		}, 2000);
	};

	render() {
		const { result, score, imgCoord } = this.state;
		return (
			<>
				<div
					id='computer'
					style={{
						background: `url(./public/assets/rsp.png) ${imgCoord} 0/auto 200px `,
					}}
				></div>
				<div>
					<button id='scissors' className='btn' onClick={this.onClickBtn}>
						가위
					</button>
					<button id='rock' className='btn' onClick={this.onClickBtn}>
						바위
					</button>
					<button id='paper' className='btn' onClick={this.onClickBtn}>
						보
					</button>
				</div>
				<div>{result}</div>
				<div id='score'>{score}</div>
			</>
		);
	}
}

export default RspGame;
