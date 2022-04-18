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
				<a
					id={topics[i].id}
					href={'/read/' + topics[i].id}
					onClick={onChangeMode}
				>
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
	const [id, setId] = useState(null);

	const topics = [
		{ id: 1, title: 'html', body: 'html is ...' },
		{ id: 2, title: 'css', body: 'css is ...' },
		{ id: 3, title: 'javascript', body: 'javascript is ...' },
	];

	const onChangeModeHeader = (e) => {
		e.preventDefault();
		setMode('WELCOME');
	};

	const onChangeModeNav = (e) => {
		e.preventDefault();
		setMode('READ');
		setId(e.target.id);
	};

	let content = null;
	if (mode === 'WELCOME') {
		content = <Article title='Welcome' body='Welcome이닷!' />;
	} else if (mode === 'READ') {
		let title, body;
		topics.map((v) => {
			if (v.id === id) {
				title = v.title;
				body = v.body;
			}
		});
		content = <Article title={title} body={body} />;
	}

	return (
		<>
			<Header title='REACT' onChangeMode={onChangeModeHeader} />
			<Nav topics={topics} onChangeMode={onChangeModeNav} />
			{content}
		</>
	);
};

export default Test;
