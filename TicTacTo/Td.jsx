import React, { useCallback } from 'react';
import { CHANGE_TURN, CLICK_CELL } from './TicTacTo';

const Td = ({ cellData, rowIndex, cellIndex, dispatch }) => {
	const onClickTd = useCallback(() => {
		console.log(rowIndex, cellIndex);
		dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
		dispatch({ type: CHANGE_TURN });
	}, []);

	return (
		<>
			<td onClick={onClickTd}>{cellData}</td>
		</>
	);
};

export default Td;
