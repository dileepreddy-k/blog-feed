import React, {Fragment} from 'react';
import { Route, Router, Switch, Redirect } from "react-router-dom";

import Feeds from './components/Feeds';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import PrivateRoute from './utils/PrivateRoute';
import Main from './Layout/main';

import history from './utils/history';

const App = () => {

	return(
		<Fragment>
			<Router history={history}>
				<Switch>
					<Route exact path="/signin" component={SignIn}></Route>
					<Route exact path="/signup" component={SignUp}></Route>
					<PrivateRoute path='/feed' layout={Main} component={Feeds}></PrivateRoute>
					<Redirect exact from="/" to="signin" />
					<Redirect exact from="" to="/signin" />
				</Switch>
			</Router>
		</Fragment>
	)

}

export default App;
