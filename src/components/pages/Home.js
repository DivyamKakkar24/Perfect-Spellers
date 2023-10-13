import React, { useContext } from 'react';
import Navbar from '../header/Navbar';
import ProfileNavbar from '../header/ProfileNavbar';
import { Navigate, useLocation, useRouteLoaderData } from 'react-router-dom';
import SelectCriteria from '../player/SelectCriteria';
import SpellWords from '../player/SpellWords';
import AuthContext from '../../context/auth-context';
import { useSelector } from 'react-redux';
import BlankImage from '../ui/BlankImage';
import TestMode from '../player/TestMode';


const Home = () => {
	const ctx = useContext(AuthContext);
	const token = useRouteLoaderData('root');

	const showPractice = useSelector((state) => state.tabs.showPracticeList);

	const showBlank = useSelector((state) => state.tabs.showBlanki);

	const startTest = useSelector((state) => state.tabs.showTest);

	const newList = useSelector((state) => state.tabs.reloadId);

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
			{ !startTest && <SelectCriteria /> }
			{ showBlank && <BlankImage /> }
	  	{ showPractice && <SpellWords key={newList} /> }
			{ startTest && <TestMode /> }
	  </>
	)
};

export default Home;