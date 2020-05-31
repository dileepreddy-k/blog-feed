import React, { Fragment } from 'react';

import TopBar from './components/TopBar';

const main = (props) => {
	return (
		<Fragment>
			<TopBar></TopBar>
			<main className="container">
				{props.children}
			</main>
		</Fragment>
	)
}

export default main;
