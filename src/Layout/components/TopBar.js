import React from 'react';

import { useCookies } from 'react-cookie';

//reactstrap components
import { Card, Button } from 'reactstrap';

import history from './../../utils/history';

const TopBar = () => {
	
	const [cookies, setCookie, removeCookie] = useCookies(['token']);
	
	const handleSignOut = () => {
		removeCookie("token");
        history.push({pathname:"/signin",message:"You have been logged out successfully"});
	}
	
	return (
		<Card style={{padding: '15px 0', margin: '0 0 15px 0'}}>
			<div className="container">
				<div className="d-flex justify-content-between align-items-center">
					<h3>Blog Feed</h3>
					<Button size="sm" color="danger" onClick={() => {handleSignOut()}}>Logout</Button>
				</div>
			</div>
		</Card>
	)
}

export default TopBar;
