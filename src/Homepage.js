import React from "react";
import "./homepagestyles.css";
import logo from "./logo_size.jpg";
import { useHistory } from "react-router-dom";

const Homepage = () => {
  const history = useHistory();

  const AboutButton = () => {
    history.push("/About");
  };

  const ContactButton = () => {
    history.push("/Contact");
  };

  const LoginButton = () => {
    history.push("/Login");
  };

  const RegisterButton = () => {
    history.push("/Register");
  };
  return (
    <div className="wrapper">
      <img
        className="background11"
        src="https://images.unsplash.com/photo-1457200246108-d9d4abc27953?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        alt="logo"
      />
      <nav className="navbar">
        <ul>
          <li>
            <a className="active" href="">
              Home
            </a>
          </li>
          <li>
            <a onClick={() => AboutButton()} href="">
              About
            </a>
          </li>
          <li>
            <a onClick={() => ContactButton()} href="">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <div className="center">
        <h1>The Flat Finder</h1>
        <div className="buttons">
          <button onClick={() => LoginButton()}>Login</button>
          <button onClick={() => RegisterButton()} className="btn2">
            Register
          </button>
          <img className="logo" src={logo} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
