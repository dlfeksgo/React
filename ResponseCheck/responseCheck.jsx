import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
	const [state, setState] = useState('waiting');
	const [message, setMessage] = useState('준비가 되면 클릭해주세요😀');
	const [result, setResult] = useState([]);
	const timeId = useRef(null);
	const startTime = useRef(0);
	const endTime = useRef(0);

	const onClickScreen = () => {
		switch (state) {
			case 'waiting':
				setState('ready');
				setMessage('초록 화면이 되면 클릭해주세요');
				startTime.current = new Date();
				timeId.current = setTimeout(() => {
					setState('now');
					setMessage('지금이야!');
				}, Math.floor(Math.random() * 1000) + 1000);
				break;
			case 'ready':
				setState('waiting');
				setMessage('성급했어~');
				clearTimeout(timeId.current);
				break;
			case 'now':
				endTime.current = new Date();
				setState('waiting');
				setMessage('준비가 되면 클릭해주세요😀');
				setResult((prevResult) => {
					return [...prevResult, endTime.current - startTime.current];
				});
				break;
		}
	};

	const onClickBtn = () => {
		setState('waiting');
		setMessage('준비가 되면 클릭해주세요😀');
		setResult([]);
	};

	const renderAverage = () => {
		return result.length === 0 ? null : (
			<>
				<div>평균 {result.reduce((a, b) => a + b) / result.length} ms</div>
			</>
		);
	};

	return (
		<>
			<div id="screen" className={state} onClick={onClickScreen}>
				{message}
			</div>
			<button onClick={onClickBtn}>리셋</button>
			{renderAverage()}
		</>
	);
};
export default ResponseCheck;
