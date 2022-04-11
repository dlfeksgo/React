import React, { useCallback } from 'react';
import { CLICK_CELL } from './TicTacTo';

const Td = ({ cellData, rowIndex, cellIndex, dispatch }) => {
	const onClickTd = useCallback(() => {
		if (cellData) {
			return;
		}

		dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
	}, [cellData]);

	return (
		<>
			<td onClick={onClickTd}>{cellData}</td>
		</>
	);
};

export default Td;
