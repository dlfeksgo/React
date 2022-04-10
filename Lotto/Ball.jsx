import React, { memo } from 'react';

const Ball = ({ number }) => {
	let background;
	if (number >= 40) {
		background = 'green';
	} else if (number >= 30) {
		background = 'blue';
	} else if (number >= 20) {
		background = 'yellow';
	} else if (number >= 10) {
		background = 'orange';
	} else {
		background = 'red';
	}
	return (
		<div className="ball" style={{ background }}>
			{number}
		</div>
	);
};

export default memo(Ball);
