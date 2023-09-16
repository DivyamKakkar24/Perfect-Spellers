import React, { useContext } from 'react';
import SpellWords from '../player/SpellWords';
import AuthContext from '../../context/auth-context';
import { Navigate } from 'react-router-dom';
import ProfileNavbar from '../header/ProfileNavbar';

const ProfileHome = () => {
  const ctx = useContext(AuthContext);

  if(ctx.user === null){
    return <Navigate to="/" />
  }

	return (
	  <>
	  	<ProfileNavbar />
	  	<SpellWords />
	  </>
	)
};

export default ProfileHome;