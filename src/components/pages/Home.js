import React, { useContext } from 'react';
import Navbar from '../header/Navbar';
import ProfileNavbar from '../header/ProfileNavbar';
import { Navigate, useLocation, useRouteLoaderData } from 'react-router-dom';
import SelectCriteria from '../player/SelectCriteria';
import SpellWords from '../player/SpellWords';
import AuthContext from '../../context/auth-context';


const Home = () => {
	const ctx = useContext(AuthContext);
	const token = useRouteLoaderData('root');

	let valid = false;
	
	const location = useLocation();

	if(location.pathname === '/home'){
		console.log("Inside Home!");
		return <Navigate to="/" />
	}

	if(token && ctx.user && token === ctx.user.accessToken){
		valid = true;
	}

	return (
	  <>
	  	{valid && <ProfileNavbar />}
			{!valid && <Navbar />}
			<SelectCriteria />
	  	<SpellWords />
	  </>
	)
};

export default Home;