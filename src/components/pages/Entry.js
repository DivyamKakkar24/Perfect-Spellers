import React, { useEffect } from 'react';
import Navbar from '../header/Navbar';
import Login from '../auth/Login';

// const clientId = "975198042328-vnmnas78i021t67fqe2raljeguqgbvca.apps.googleusercontent.com";

const Entry = () => {

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: ""
  //     })
  //   };

  //   gapi.load('client:auth2', start);
  // });
  
	return (
	  <div>
	  	<Navbar />
      <Login />
	  </div>
	)
};

export default Entry;