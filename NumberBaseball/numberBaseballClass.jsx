import React, { Component } from 'react';
import Try from './try';

function getNumbers() {
	const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const array = [];
	for (let i = 0; i < 4; i++) {
		const chosen = candidate.splice(Math.floor(Math.random() * 9 - i), 1)[0];
		array.push(chosen);
	}
	return array;
}

class NumberBaseball extends Component {
	state = {
		result: '',
		value: '',
		answer: getNumbers(), //랜덤한 정답 4자리 숫자 얻기
		tries: [],
	};

	onSubmitForm = (e) => {
		e.preventDefault();
		if (this.state.value === this.state.answer.join('')) {
			this.setState({
				result: '홈런',
				tries: [
					...this.state.tries,
					{ try: this.state.value, result: '홈런!' },
				],
			});
		} else {
			const answerArray = this.state.value.split('').map((v) => {
				return parseInt(v);
			});
			let strike = 0;
			let ball = 0;
			if (this.state.tries.length >= 9) {
				this.setState({
					result: `10번의 기회를 소진했습니다! 정답은 ${this.state.answer.join(
						','
					)}`,
				});
				alert('게임을 다시 시작합니다.');
				this.setState({
					value: '',
					answer: getNumbers(),
					tries: [],
				});
			} else {
				// console.log(this.state.value);
				// console.log(answerArray);
				answerArray.map((v, i) => {
					if (v === this.state.answer[i]) {
						strike++;
					} else if (this.state.answer.includes(v)) {
						ball++;
					}
				});
				this.setState({
					value: '',
					tries: [
						...this.state.tries,
						{
							try: this.state.value,
							result: `${strike}스트라이크 ${ball}볼입니다.`,
						},
					],
				});
			}
		}
	};

	inputRef = (c) => {
		this.input = c;
	};

	onChangeInput = (e) => {
		// console.log(this.state.answer);
		this.setState({
			value: e.target.value,
		});
	};

	render() {
		return (
			<>
				<h1>{this.state.result}</h1>
				<form onSubmit={this.onSubmitForm}>
					<input
						maxLength={4}
						ref={this.inputRef}
						type="text"
						value={this.state.value}
						onChange={this.onChangeInput}
					/>
				</form>
				<p>시도: {this.state.tries.length}</p>
				<ul>
					{this.state.tries.map((v, i) => {
						return <Try key={i} tryInfo={v} />;
					})}
				</ul>
			</>
		);
	}
}

export default NumberBaseball;
