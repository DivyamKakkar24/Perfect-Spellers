import React from 'react';
import { Navigate, useSearchParams} from 'react-router-dom';
import Login from './Login';
import SignUp from './Signup';


const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const mode = searchParams.get('mode');


  if(mode !== 'login' && mode !== 'signup'){
    return <Navigate to="/auth?mode=signup" />;
  }

  return (
    <>
      {isLogin ? <Login /> : <SignUp />}
    </>
  )
};

export default AuthForm;