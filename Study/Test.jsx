import React, { useCallback, useState } from 'react';

const Header = ({ title, onChangeMode }) => {
	return (
		<h1>
			<a className="head" href="/" onClick={onChangeMode}>
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
					className="lis"
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
	const onSubmitFrom = useCallback((e) => {
		e.preventDefault();
		const title = e.target.title.value;
		const body = e.target.body.value;
		onCreate(title, body);
	}, []);

	return (
		<>
			<h1>Create</h1>
			<form onSubmit={onSubmitFrom}>
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

const Update = ({ onUpdate, title, body, id }) => {
	const [_title, setTitle] = useState(title);
	const [_body, setBody] = useState(body);
	const [_id, setId] = useState(id);

	const onSubmitFrom = useCallback((e) => {
		e.preventDefault();
		const id = _id;
		const title = e.target.title.value;
		const body = e.target.body.value;
		onUpdate(id, title, body);
	}, []);

	const onChangeTitle = useCallback(
		(e) => {
			setTitle(e.target.value);
		},
		[_title]
	);

	const onChangeBody = useCallback(
		(e) => {
			setBody(e.target.value);
		},
		[_body]
	);

	return (
		<>
			<h1>Update</h1>
			<form onSubmit={onSubmitFrom}>
				<p>
					<input
						name="title"
						type="text"
						placeholder="title"
						value={_title}
						onChange={onChangeTitle}
					/>
				</p>
				<p>
					<textarea
						name="body"
						id=""
						cols="20"
						rows="2"
						placeholder="body"
						value={_body}
						onChange={onChangeBody}
					></textarea>
				</p>
				<button type="submit">Update</button>
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

	const onChangeMode = useCallback(
		(e) => {
			e.preventDefault();
			switch (e.target.className) {
				case 'head':
					setMode('WELCOME');
					break;
				case 'lis':
					setMode('READ');
					setId(Number(e.target.id));
					break;
				case 'createBtn':
					setMode('CREATE');
					break;
				case 'updateBtn':
					setMode('UPDATE');
					break;
			}
		},
		[mode, id]
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

	const onUpdateList = useCallback(
		(id, _title, _body) => {
			const newTopics = [...topics];
			const updatedTopic = { id: id, title: _title, body: _body };
			for (let i = 0; i < newTopics.length; i++) {
				if (newTopics[i].id === id) {
					console.log(newTopics[i]);
					newTopics[i] = updatedTopic;
				}
			}
			// newTopics.map((v) => {
			// 	if (v.id === id) {
			// 		v.title = updatedTopic.title;
			// 		v.body = updatedTopic.body;
			// 	}
			// });
			setTopics(newTopics);
			setMode('READ');
		},
		[topics]
	);

	// const onDeleteList = useCallback(
	// 	(e) => {
	// 		const newTopics = [];
	// 		console.log(e);
	// 		// topics.map((v) => {
	// 		// 	console.log(id);
	// 		// });
	// 	},
	// 	[topics]
	// );

	const Delete = ({ id }) => {
		const onDeleteList = useCallback(() => {
			const newTopics = [];
			topics.map((v) => {
				if (v.id !== id) {
					newTopics.push(v);
				}
			});
			setTopics(newTopics);
		}, [topics]);

		return <button onClick={onDeleteList}>Delete</button>;
	};

	let content = null;
	let updateControl = null;
	if (mode === 'WELCOME') {
		content = <Article title="Welcome" body="Welcome이닷!" />;
	} else if (mode === 'READ') {
		topics.map((v) => {
			if (v.id === id) {
				content = <Article title={v.title} body={v.body} />;
			}
		});
		updateControl = (
			<>
				<li>
					<a className="updateBtn" href="/update" onClick={onChangeMode}>
						update
					</a>
				</li>
				<p>
					{/* <button onClick={onDeleteList}>Delete</button> */}
					<Delete id={id} />
				</p>
			</>
		);
	} else if (mode === 'CREATE') {
		content = <Create onCreate={onCreateList} />;
	} else if (mode === 'UPDATE') {
		topics.map((v) => {
			if (v.id === id) {
				content = (
					<Update
						id={v.id}
						title={v.title}
						body={v.body}
						onUpdate={onUpdateList}
					/>
				);
			}
		});
	}

	return (
		<>
			<Header title="REACT" onChangeMode={onChangeMode} />
			<Nav topics={topics} onChangeMode={onChangeMode} />
			{content}
			<ul>
				<li>
					<a className="createBtn" href="/create" onClick={onChangeMode}>
						create
					</a>
				</li>
				{updateControl}
			</ul>
		</>
	);
};

export default Test;
