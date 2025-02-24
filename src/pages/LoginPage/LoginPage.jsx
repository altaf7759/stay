import React from "react";
import "./LoginPage.css";
import Login from "../../components/Login/Login";
import Navbar from "../../components/Navbar/Navbar";

const LoginPage = () => {
  return (
    <div className="container">
      <div className="nav-box">
        <Navbar className="nav" />
      </div>
      <Login />
    </div>
  );
};

export default LoginPage;
