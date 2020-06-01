import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import API from './../api/api';

import { userContext } from './userContext';

class PrivateRoute extends React.Component{

    state={
		redirect: false,
		loading: true,
        user:{}
	}
	
    componentDidMount(){
        API.post('user/checkToken',{},{withCredentials:true})
        .then( res => {
            if(res.status ===200){
                this.setState({
					loading: false, 
					user: res.data
				})
            }
        }).catch( err => {
            this.setState({
				loading: false,
				redirect: true
			})
        })
    }
    render(){

        const { layout: Layout, component: Component, ...rest } = this.props;
		const { redirect, loading } = this.state;
		
		if(loading){
            return null
        }

        if(redirect){
            return <Redirect to="/signin"/>
		}
		
        return(
            <Route {...rest} render ={ matchProps =>(
                <userContext.Provider value={this.state.user}>
                    <Layout><Component {...matchProps}></Component></Layout>
                </userContext.Provider>
            )}/>
        );
    }
}

export default PrivateRoute;
