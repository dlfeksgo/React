import React, { Component } from 'react';

function getWinNumbers() {
	const shuffled = [];
	const numbers = Array(45)
		.fill()
		.map((v, i) => {
			return i + 1;
		});
	for (let i = 0; i < 7; i++) {
		const randomNum = numbers.splice(
			Math.floor(Math.random() * numbers.length),
			1
		)[0];
		shuffled.push(randomNum);
	}
	const winBalls = shuffled.slice(0, 6).sort((a, b) => a - b);
	const bonusBall = shuffled[6];
	return [...winBalls, bonusBall];
}

class Lotto extends Component {
	state = {
		numbers: getWinNumbers(),
		winBalls: [],
		bonus: null,
	};

	timeouts = [];
	componentDidMount() {
		console.log(this.state.numbers);
		for (let j = 0; j < 6; j++) {
			this.timeouts[j] = setTimeout(() => {
				this.setState((prevState) => {
					return {
						winBalls: [...prevState.winBalls, this.state.numbers[j]],
					};
				});
			}, (j + 1) * 1000);
		}
		this.timeouts[6] = setTimeout(() => {
			this.setState({
				bonus: this.state.numbers[6],
			});
		}, 7000);
	}

	UNSAFE_componentWillMount() {
		this.timeouts.forEach((v, i) => {
			clearTimeout(v);
		});
	}

	render() {
		return (
			<>
				<div>추첨결과 : {this.state.winBalls}</div>
				<div>보너스 : {this.state.bonus}</div>
			</>
		);
	}
}

export default Lotto;
