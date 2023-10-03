import React, { useContext } from 'react';
import Navbar from '../header/Navbar';
import ProfileNavbar from '../header/ProfileNavbar';
import { Navigate, useLocation, useRouteLoaderData } from 'react-router-dom';
import SelectCriteria from '../player/SelectCriteria';
import SpellWords from '../player/SpellWords';
import AuthContext from '../../context/auth-context';
import { useSelector } from 'react-redux';
import BlankImage from '../ui/BlankImage';
import FoundWords from '../player/FoundWords';


const Home = () => {
	const ctx = useContext(AuthContext);
	const token = useRouteLoaderData('root');

	const showFoundWords = useSelector((state) => state.showFoundWordsList);

	const showPractice = useSelector((state) => state.showPracticeList);

	const showBlank = useSelector((state) => state.showBlanki);

	const newList = useSelector((state) => state.reloadId);

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
			{showBlank && <BlankImage />}
			{showFoundWords && <FoundWords key={newList} />}
	  	{showPractice && <SpellWords key={newList} />}
	  </>
	)
};

export default Home;