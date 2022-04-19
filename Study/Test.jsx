import React, { useCallback, useState } from 'react';

const Header = ({ title, onChangeMode }) => {
	return (
		<h1>
			<a href="/" onClick={onChangeMode}>
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

const Create = ({ onCreate }) => {
	return (
		<>
			<h1>Create</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const title = e.target.title.value;
					const body = e.target.body.value;
					onCreate(title, body);
				}}
			>
				<p>
					<input name="title" type="text" placeholder="title" />
				</p>
				<p>
					<textarea
						name="body"
						id=""
						cols="20"
						rows="2"
						placeholder="body"
					></textarea>
				</p>
				<button type="submit">Create</button>
			</form>
		</>
	);
};

const Test = () => {
	const [mode, setMode] = useState('WELCOME');
	const [id, setId] = useState(null);
	const [nextId, setNextId] = useState(4);
	const [topics, setTopics] = useState([
		{ id: 1, title: 'html', body: 'html is ...' },
		{ id: 2, title: 'css', body: 'css is ...' },
		{ id: 3, title: 'javascript', body: 'javascript is ...' },
	]);

	const onChangeModeHeader = useCallback(
		(e) => {
			e.preventDefault();
			setMode('WELCOME');
		},
		[mode]
	);

	const onChangeModeNav = useCallback(
		(e) => {
			e.preventDefault();
			setMode('READ');
			setId(Number(e.target.id));
		},
		[mode, id]
	);

	const onChangeModeCreateList = useCallback(
		(e) => {
			e.preventDefault();
			setMode('CREATE');
		},
		[mode]
	);

	const onCreateList = useCallback(
		(_title, _body) => {
			const newTopic = { id: nextId, title: _title, body: _body };
			const newTopics = [...topics];
			newTopics.push(newTopic);
			setTopics(newTopics);
			setMode('READ');
			setId(nextId);
			setNextId(nextId + 1);
		},
		[topics, mode, id, nextId]
	);

	let content = null;
	if (mode === 'WELCOME') {
		content = <Article title="Welcome" body="Welcome이닷!" />;
	} else if (mode === 'READ') {
		topics.map((v) => {
			if (v.id === id) {
				content = <Article title={v.title} body={v.body} />;
			}
		});
	} else if (mode === 'CREATE') {
		content = <Create onCreate={onCreateList} />;
	}

	return (
		<>
			<Header title="REACT" onChangeMode={onChangeModeHeader} />
			<Nav topics={topics} onChangeMode={onChangeModeNav} />
			{content}
			<a href="/create" onClick={onChangeModeCreateList}>
				create
			</a>
		</>
	);
};

export default Test;
