import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../../utils/auth/config";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({
  children
}) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      if (!user) router.push('/login');
    });
    return unSubscribe;
  }, []);

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

  const publicRoute = ['Login', 'Signup'].includes(children.type.name);

  return (
    <AuthContext.Provider value={value}>
      {!currentUser && !publicRoute ? <></>: children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;