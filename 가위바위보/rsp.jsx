import React, { useEffect, useRef, useState } from 'react';

const IMG_URL = './public/assets/rsp.png';
const rspCoords = {
	scissors: '0',
	rock: '-220px',
	paper: '-440px',
};

const RspGame = () => {
	const [result, setResult] = useState('');
	const [imgCoord, setImgCoord] = useState(0);
	const [score, setScore] = useState(0);
	const interval = useRef();
	let clickable = useRef(true);

	useEffect(() => {
		interval.current = setInterval(computerChange, 50); //여기가 DidMount와 DidUpdate 역할
		return () => {
			clearInterval(interval.current); //이 안이 componentWillUnmount 역할
		};
	}, [imgCoord]); //[]이 클로져를 해결해주는 역할로, 배열 안에 넣은 값들이 바뀔 때, useEffect가 실행된다.

	const computerChange = () => {
		if (imgCoord === rspCoords.scissors) {
			setImgCoord(rspCoords.rock);
		} else if (imgCoord === rspCoords.rock) {
			setImgCoord(rspCoords.paper);
		} else {
			setImgCoord(rspCoords.scissors);
		}
	};

	const onClickBtn = (e) => {
		if (!clickable.current) {
			return;
		}
		clickable.current = false;
		clearInterval(interval.current);
		const myChoice = e.target.id;
		if (myChoice === 'scissors') {
			switch (imgCoord) {
				case rspCoords.scissors:
					setResult('비겼습니다.');
					break;
				case rspCoords.rock:
					setResult('졌습니다.');
					setScore((prevScore) => {
						return prevScore - 1;
					});
					break;
				case rspCoords.paper:
					setResult('이겼습니다.');
					setScore((prevScore) => {
						return prevScore + 1;
					});
					break;
			}
		} else if (myChoice === 'rock') {
			switch (imgCoord) {
				case rspCoords.scissors:
					setResult('이겼습니다.');
					setScore((prevScore) => {
						return prevScore + 1;
					});
					break;
				case rspCoords.rock:
					setResult('비겼습니다.');
					break;
				case rspCoords.paper:
					setResult('졌습니다.');
					setScore((prevScore) => {
						return prevScore - 1;
					});
					break;
			}
		} else if (myChoice === 'paper') {
			switch (imgCoord) {
				case rspCoords.scissors:
					setResult('졌습니다.');
					setScore((prevScore) => {
						return prevScore - 1;
					});
					break;
				case rspCoords.rock:
					setResult('이겼습니다.');
					setScore((prevScore) => {
						return prevScore + 1;
					});
					break;
				case rspCoords.paper:
					setResult('비겼습니다.');
					break;
			}
		}
		setTimeout(() => {
			console.log('타임체크');
			interval.current = setInterval(computerChange, 50);
			clickable.current = true;
		}, 2000);
		// }
	};

	return (
		<>
			<div
				id='computer'
				style={{
					background: `url(./public/assets/rsp.png) ${imgCoord} 0/auto 200px `,
				}}
			></div>
			<div>
				<button id='scissors' className='btn' onClick={onClickBtn}>
					가위
				</button>
				<button id='rock' className='btn' onClick={onClickBtn}>
					바위
				</button>
				<button id='paper' className='btn' onClick={onClickBtn}>
					보
				</button>
			</div>
			<div>{result}</div>
			<div id='score'>{score}</div>
		</>
	);
};

export default RspGame;
