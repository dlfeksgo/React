import React from 'react';
import { useCallback } from 'react';

const Header = () => {
	return (
		<h1>
			<a href='/'>Web</a>
		</h1>
	);
};

const Nav = () => {
	return (
		<nav>
			<ol>
				<li>
					<a href='/read/1'>html</a>
				</li>
				<li>
					<a href='/read/2'>css</a>
				</li>
				<li>
					<a href='/read/3'>javascript</a>
				</li>
			</ol>
		</nav>
	);
};

const Article = () => {
	return (
		<article>
			<h2>Welcome</h2>
		</article>
	);
};

const Test = () => {
	return (
		<>
			<Header />
			<Nav />
			<Article />
		</>
	);
};

export default Test;
