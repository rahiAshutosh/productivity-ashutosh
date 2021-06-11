import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../../utils/auth/config";
import { PUBLIC_PAGES } from "../../utils/constants";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({
  children
}) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState();
  const [allowRender, setAllowRender] = useState(false);

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      if (!user) router.push('/login');
    });
    return unSubscribe;
  }, []);

  useEffect(() => {
    setAllowRender(PUBLIC_PAGES.includes(router.pathname));    
  }, [router.pathname]);

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  };

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const value = {
    currentUser,
    login,
    signUp,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {currentUser ? children : (allowRender ? children : null)}
    </AuthContext.Provider>
  );
};

export default AuthProvider;