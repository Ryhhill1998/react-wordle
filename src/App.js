import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/user.context";

import { Routes, Route, Navigate } from "react-router-dom";

import Welcome from "./routes/welcome/welcome.component";
import Authentication from "./routes/authentication/authentication.component";
import SignIn from "./components/sign-in/sign-in.component";
import SignUp from "./components/sign-up/sign-up.component";
import Home from "./routes/home/home.component";

import "./App.css";

const App = () => {
  // user context
  const { currentUser } = useContext(UserContext);

  // save user object in state
  const [user, setUser] = useState(null);

  // retrieve user object from localStorage and setUser to this value
  const getUserFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setUser(user);
  };

  // get user object from localStorage each time auth state changes
  useEffect(() => {
    getUserFromLocalStorage();
  }, [currentUser]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Welcome />}
        />
        <Route
          path="/sign-in"
          element={user ? <Navigate to="/home" /> : <SignIn />}
        />
        <Route
          path="/sign-up"
          element={user ? <Navigate to="/home" /> : <SignUp />}
        />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
