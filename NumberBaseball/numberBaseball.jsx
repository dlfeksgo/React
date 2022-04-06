import React, { useState, useRef } from 'react';
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

const NumberBaseball = () => {
	const [result, setResult] = useState('');
	const [value, setValue] = useState('');
	const [answer, setAnswer] = useState(getNumbers());
	const [tries, setTries] = useState([]);
	const inputRef = useRef(null);

	const onSubmitForm = (e) => {
		e.preventDefault();
		if (value === answer.join('')) {
			setResult('홈런');
			setTries((prevTries) => {
				return [...prevTries, { try: value, result: '홈런' }];
			});
		} else {
			const answerArray = value.split('').map((v) => {
				return parseInt(v);
			});
			let strike = 0;
			let ball = 0;
			if (tries.length >= 9) {
				setResult(`10번의 기회를 소진했습니다! 정답은 ${answer.join(',')}`);
				alert('게임을 다시 시작합니다.');
				setValue('');
				setAnswer(getNumbers());
				setTries([]);
			} else {
				answerArray.map((v, i) => {
					if (v === answer[i]) {
						strike++;
					} else if (answer.includes(v)) {
						ball++;
					}
				});
				setValue('');
				setTries((prevTries) => {
					return [
						...prevTries,
						{
							try: value,
							result: `${strike}스트라이크 ${ball}볼입니다.`,
						},
					];
				});
			}
		}
	};

	const onChangeInput = (e) => {
		setValue(e.target.value);
	};

	return (
		<>
			<h1>{result}</h1>
			<form onSubmit={onSubmitForm}>
				<input
					maxLength={4}
					ref={inputRef}
					type="text"
					value={value}
					onChange={onChangeInput}
				/>
			</form>
			<p>시도: {tries.length}</p>
			<ul>
				{tries.map((v, i) => {
					return <Try key={i} tryInfo={v} />;
				})}
			</ul>
		</>
	);
};

export default NumberBaseball;
