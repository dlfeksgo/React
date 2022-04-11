import React, { memo } from 'react';
import Td from './Td';

const Tr = ({ rowData, rowIndex, dispatch }) => {
	return (
		<>
			<tr>
				{Array(rowData.length)
					.fill()
					.map((td, i) => (
						<Td
							key={i}
							cellData={rowData[i]}
							rowIndex={rowIndex}
							cellIndex={i}
							dispatch={dispatch}
						/>
					))}
			</tr>
		</>
	);
};

export default memo(Tr);
