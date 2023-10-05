import React, { useContext } from 'react';
import Navbar from '../header/Navbar';
import AuthForm from '../auth/Authenticate';
import { Navigate, useRouteLoaderData } from 'react-router-dom';
import AuthContext from '../../context/auth-context';


const Entry = () => {
	const token = useRouteLoaderData('auth');
	const ctx = useContext(AuthContext);
	
	if(token && ctx.user && token === ctx.user.accessToken){
		// console.log(token);
		return <Navigate to="/" />;
	}
  
	return (
	  <>
	  	<Navbar />
      <AuthForm />
	  </>
	)
};

export default Entry;