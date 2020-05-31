import React, { useEffect, useState } from 'react';

import { Route, Redirect } from 'react-router-dom';
import API from './../api/api';

const PrivateRoute = (props) => {	

	const { component: Component,...rest } = props;

	const [user, setUser] = useState({});
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		
		API.post('user/checkToken',{},{withCredentials:true})
			.then( res => {
				if(res.status === 200){
					setUser(res.data);
					setIsAuthenticated(true);
				} else {
					setUser({});
					setIsAuthenticated(false);
				}
			}).catch( err => {
				console.log(err);
			});

			return () => {
				setUser({});
				setIsAuthenticated(false);
			}
	}, []);

	return(
		<Route {...rest} render ={ (props) =>(
			isAuthenticated === true
				? <Component {...props}></Component>
				: <Redirect to="/signin" />
		)}/>
	);
}

export default PrivateRoute;
