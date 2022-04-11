import React, { useCallback, useReducer } from 'react';
import Table from './Table';

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';

//reducer함수는 바깥에
const reducer = (state, action) => {
	switch (action.type) {
		case SET_WINNER:
			return {
				...state,
				winner: action.winner,
			};
		case CLICK_CELL:
			const tableData = [...state.tableData];
			tableData[action.row] = [...tableData[action.row]];
			tableData[action.row][action.cell] = state.turn;
			return {
				...state,
				tableData,
				// turn: 'O'? 'X' : 'O',
			};
		case CHANGE_TURN:
			return {
				...state,
				turn: state.turn === 'O' ? 'X' : 'O',
			};
	}
};

const TicTacTo = () => {
	const initialState = {
		turn: 'O',
		winner: '',
		tableData: [
			['', '', ''],
			['', '', ''],
			['', '', ''],
		],
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	// const onClickTable = useCallback(() => {
	// 	dispatch({ type: SET_WINNER, winner: 'O' });
	// }, []);

	return (
		<>
			<Table
				// onClick={onClickTable}
				tableData={state.tableData}
				dispatch={dispatch}
			/>
			{state.winner && <div>{state.winner}의 승리!</div>}
		</>
	);
};

export default TicTacTo;
