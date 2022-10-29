import { createContext, useState, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const value = {
    currentUser,
    setCurrentUser,
  };

  const saveUserToLocalStorage = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setCurrentUser(user);
      saveUserToLocalStorage(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
