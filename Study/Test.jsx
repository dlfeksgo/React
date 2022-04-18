import React, { useCallback, useState } from 'react';

const Header = ({ title, onChangeMode }) => {
	return (
		<h1>
			<a href='/' onClick={onChangeMode}>
				{title}
			</a>
		</h1>
	);
};

const Nav = ({ topics, onChangeMode }) => {
	let lis = [];
	for (let i = 0; i < topics.length; i++) {
		lis.push(
			<li key={topics[i].id}>
				<a href={'/read/' + topics[i].id} onClick={onChangeMode}>
					{topics[i].title}
				</a>
			</li>
		);
	}

	return (
		<nav>
			<ol>{lis}</ol>
		</nav>
	);
};

const Article = ({ title, body }) => {
	return (
		<article>
			<h2>{title}</h2>
			<p>{body}</p>
		</article>
	);
};

const Test = () => {
	const [mode, setMode] = useState('WELCOME');

	const onChangeModeHeader = (e) => {
		e.preventDefault();
		setMode('WELCOME');
	};

	const onChangeModeNav = (e) => {
		e.preventDefault();
		setMode('READ');
	};

	const topics = [
		{ id: 1, title: 'html', body: 'html is ...' },
		{ id: 2, title: 'css', body: 'css is ...' },
		{ id: 3, title: 'javascript', body: 'javascript is ...' },
	];
	return (
		<>
			<Header title='REACT' onChangeMode={onChangeModeHeader} />
			<Nav topics={topics} onChangeMode={onChangeModeNav} />
			<Article title='Welcome' body='Hello React!' />
		</>
	);
};

export default Test;
