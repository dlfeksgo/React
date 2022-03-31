import React, { Component } from 'react';
import Try from './try';

class NumberBaseball extends Component {
	state = {
		result: '',
		value: '',
		tries: '',
	};

	fruits = [
		{ fruit: '🍎', taste: '사과' },
		{ fruit: '🍊', taste: '귤' },
		{ fruit: '🍌', taste: '바나나' },
		{ fruit: '🍓', taste: '딸기' },
		{ fruit: '🥝', taste: '키위' },
	];

	render() {
		return (
			<>
				<h1>{this.state.result}</h1>
				<form>
					<input type="text" />
					{/* <button>입력</button> */}
				</form>
				<p>시도: {this.state.tries}</p>
				<ul>
					{this.fruits.map((v, i) => {
						return <Try value={v} index={i} />;
					})}
				</ul>
			</>
		);
	}
}

export default NumberBaseball;
