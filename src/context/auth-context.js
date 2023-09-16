import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase';


const AuthContext = React.createContext({
  user: null,
  isLoggedIn: false,
  onSignUp: (email, password) => {},
  onLogIn: (email, password) => {},
  onLogOut: () => {},
  googleSignIn: () => {}
});


export const AuthContextProvider = (props) => {
  const [user, setUser] = useState("");

  const signUpHandler = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const logInHandler = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logOutHandler = () => {
    return signOut(auth);
  }

  const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();

    return signInWithPopup(auth, googleAuthProvider);
  }
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: false,
        onSignUp: signUpHandler,
        onLogIn: logInHandler,
        onLogOut: logOutHandler,
        googleSignIn
      }}
    >
      { props.children }
    </AuthContext.Provider>
  );
}

export default AuthContext;
