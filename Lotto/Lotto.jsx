import React, { useEffect, useRef, useState, useMemo } from 'react';
import Ball from './Ball';

function getWinNumbers() {
	console.log('getWinNumbers');
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

const Lotto = () => {
	const lottoNumbers = useMemo(() => getWinNumbers(), []);
	const [numbers, setNumbers] = useState(lottoNumbers);
	const [winBalls, setWinBalls] = useState([]);
	const [bonus, setBonus] = useState(null);
	const timeouts = useRef([]);

	useEffect(() => {
		for (let j = 0; j < 6; j++) {
			timeouts.current[j] = setTimeout(() => {
				setWinBalls((prevWinBalls) => [...prevWinBalls, numbers[j]]);
			}, (j + 1) * 1000);
		}
		timeouts.current[6] = setTimeout(() => {
			setBonus(numbers[6]);
		}, 7000);
		return () => {
			timeouts.current.forEach((v, i) => {
				clearTimeout(v);
			});
		};
	}, []);

	return (
		<>
			<div> 추첨결과 </div>
			<div>
				{winBalls.map((v) => (
					<Ball key={v} number={v} />
				))}
			</div>
			<div>보너스!</div>
			{bonus && <Ball number={bonus} />}
		</>
	);
};

export default Lotto;
