import React, { useEffect, useState, useContext } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    try {
      setLoggedIn(true);
      return auth.signInWithEmailAndPassword(email, password);
    } catch {
      setLoggedIn(false);
      console.log("Login Auth Error");
    }
  }

  function logout() {
    try {
      setLoggedIn(false);
      return auth.signOut();
    } catch {
      console.log("Logout Auth Error");
    }
  }

  function getCurrentEmail() {
    if (loggedIn) {
      return currentUser.email;
    } else {
      return "No current user";
    }
  }

  function getCurrentUID() {
    if (loggedIn) {
      return currentUser.uid;
    } else {
      return "No current user";
    }
  }

  function getLoggedIn() {
    if (loggedIn) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    const exit = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      //setLoggedIn(true);
    });

    return exit;
  }, []);

  const [currentUser, setCurrentUser] = useState("null");
  const [loggedIn, setLoggedIn] = useState(false);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    getCurrentUID,
    getCurrentEmail,
    getLoggedIn
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
