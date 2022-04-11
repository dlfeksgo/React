import React, { useCallback, useEffect, useReducer } from 'react';
import Table from './Table';

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

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
				recentIndex: [action.row, action.cell],
			};
		case CHANGE_TURN:
			return {
				...state,
				turn: state.turn === 'O' ? 'X' : 'O',
			};
		case RESET_GAME:
			return {
				...state,
				turn: 'O',
				tableData: [
					['', '', ''],
					['', '', ''],
					['', '', ''],
				],
				recentIndex: [-1, -1],
			};
		// default:
		// 	return state;
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
		recentIndex: [-1, -1],
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const [row, cell] = state.recentIndex;
		if (row < 0) {
			return;
		}
		let win = false;
		if (
			state.tableData[row][0] === state.turn &&
			state.tableData[row][1] === state.turn &&
			state.tableData[row][2] === state.turn
		) {
			win = true;
		}
		if (
			state.tableData[0][cell] === state.turn &&
			state.tableData[1][cell] === state.turn &&
			state.tableData[2][cell] === state.turn
		) {
			win = true;
		}
		if (
			state.tableData[0][0] === state.turn &&
			state.tableData[1][1] === state.turn &&
			state.tableData[2][2] === state.turn
		) {
			win = true;
		}
		if (
			state.tableData[0][2] === state.turn &&
			state.tableData[1][1] === state.turn &&
			state.tableData[2][0] === state.turn
		) {
			win = true;
		}
		if (win) {
			dispatch({ type: SET_WINNER, winner: state.turn });
			dispatch({ type: RESET_GAME });
		} else {
			let all = true;
			state.tableData.forEach((row) => {
				row.forEach((cell) => {
					if (!cell) {
						all = false;
					}
				});
			});
			if (all) {
				dispatch({ type: RESET_GAME });
			} else {
				dispatch({ type: CHANGE_TURN });
			}
		}
	}, [state.recentIndex]);

	return (
		<>
			<Table tableData={state.tableData} dispatch={dispatch} />
			{state.winner && <div>{state.winner}의 승리!</div>}
		</>
	);
};

export default TicTacTo;
