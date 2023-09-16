import React from 'react';
import Navbar from '../header/Navbar';
import Welcome from '../ui/Welcome';
import ProfileNavbar from '../header/ProfileNavbar';
import { useRouteLoaderData } from 'react-router-dom';

const Home = () => {
	// const ctx = useContext(AuthContext);
	const token = useRouteLoaderData('root');

	return (
	  <>
	  	{token && <ProfileNavbar />}
			{!token && <Navbar />}
	  	<Welcome />
	  </>
	)
};

export default Home;