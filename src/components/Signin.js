import React, { useState } from 'react';

//Reactstrap Components
import { Button, Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';

import API from './../api/api';
import history from './../utils/history';

const Signin = () => {

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [formSubmitted, setFormSubmitted] = useState(false);
	
	const handleOnSubmit = (e) => {
		e.preventDefault();

		setFormSubmitted(true);

		if(email === "" || password === ""){
			return;
		}

		API.post("/user/login", { email, password },{withCredentials: true})
			.then((response) => {
				
				if (response.status === 200) {
					history.push({
						pathname:"/feed",
					
					});
				} else {
					const error = new Error(response.error);
					console.log(error);
          			throw error;
				}
			})
			.catch((err) => {
				const error = err.response.data;
				console.log(error);				
			});
	}
	
	return (
		<div className="container">
			<Card style={{margin: '20px 0'}}>
				<CardBody>
					<Form onSubmit={(e) => handleOnSubmit(e)} action="POST">
						<h3 className="page-header">Login</h3>
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
						<Button type="submit" color="primary">Submit</Button>
					</Form>
					<p>New here? <a href="/signup">Signup</a></p>
				</CardBody>
			</Card>
		</div>
	)
}

export default Signin;
