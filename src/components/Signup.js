import React, { useState } from 'react';

//Reactstrap Components
import { Button, Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';

import API from './../api/api';
import history from './../utils/history';

const Signup = () => {

	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [formSubmitted, setFormSubmitted] = useState(false);

	const handleOnSubmit = (event) => {
		event.preventDefault();

		setFormSubmitted(true);

		if (name && email && password) {
			API.post("/user/register", { name, email, password })
			.then((res) => {
				if (res.status === 200) {
					history.push({
						pathname:"/signin", 
						message:res.data.message
					});
				}
			})
			.catch((err) => {
				const error = err.response.data;
				console.log(error);
				throw error;
			});
		}
	};

	return (
		<div className="container">
			<Card style={{margin: '20px 0'}}>
				<CardBody>
					<Form onSubmit={(e) => handleOnSubmit(e)} action="POST">
						<h3 className="page-header">Sign Up</h3>
						<FormGroup>
							<Label for="uasename">Username</Label>
							<Input type="text" name="name" id="username" placeholder="Username" 
								onChange={(e) => setName(e.target.value)} required
							/>
						</FormGroup>
						<FormGroup>
							<Label for="useremail">Email</Label>
							<Input type="email" name="email" id="useremail" placeholder="Email" 
								onChange={(e) => setEmail(e.target.value)} required
							/>
						</FormGroup>
						<FormGroup>
							<Label for="userPassword">Password</Label>
							<Input type="password" name="password" id="userPassword" placeholder="Password" 
								onChange={(e) => setPassword(e.target.value)} required
							/>
						</FormGroup>
						<Button type="submit" color="primary" size="sm">Sign up</Button>
					</Form>
					<p>Alreadry Registered? <a href="/signin">Login</a></p>
				</CardBody>
			</Card>
		</div>
	)
}

export default Signup;
