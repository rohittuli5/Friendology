import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AuthService from "./services/auth.service";
import {useState, useEffect} from 'react';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import 'bootstrap/dist/css/bootstrap.min.css'
import Friends from "./Components/Friends"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut=()=>{
    AuthService.logout();
  }

	return (
    <div >
      <div >
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">

          {currentUser &&(
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Update Profile
            </Link>
          </li>
          ) }
        </div>
        <div className="navbar-nav ms-auto ">
          
          {currentUser && (
            <li className="nav-item">
              <span  className="nav-link mx-auto " style={{color:'white'}} >
                {currentUser.email}
              </span>
            </li>
          )}
          </div>

        {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/signup"} className="nav-link">
                Sign up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="auth-wrapper container mt-3">

        <Routes>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/private" element={<Private />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </div>
    </div>
    
  </div>
  );

}

export default App;