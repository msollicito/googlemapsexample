import React, { useState } from "react";
import style from "./loginForm.css";
import firebase from "./firebase";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./contexts/authcontext";

function LoginForm() {
  const { login } = useAuth();
  //const { getLoggedIn } = useAuth();
  const history = useHistory();

  const handleSignUpClick = () => {
    history.push("/Register");
  };

  async function function1() {
    try {
      await login(loginVals.email, loginVals.password);
      console.log("user logged in");
      history.push("/Dashboard");
    } catch {
      console.log("ERROR: Problem with Firebase User Login");
    }
  }

  const LoginFunct = (e) => {
    e.preventDefault();
    function1();
  };

  const [loginVals, setLoginVals] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginVals({
      ...loginVals,
      [name]: value
    });
  };

  return (
    <form className="form2" onSubmit={LoginFunct}>
      <div className="form-container2">
        <div className="form-content-left2">
          <img
            src="https://cdn.dribbble.com/users/989466/screenshots/12002010/media/41c270f90ea9e4d1507c3c0fc4922dc3.png?compress=1&resize=400x300"
            className="form-img2"
            alt="putpichere"
          />
        </div>
        <h1> THE FLAT FINDER </h1>
        <div className="form-content-right-group2">
          <div className="form-content-right2">
            <label htmlFor="email" className="emailLabel" className="word-list">
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="emailInput2"
              placeholder="Enter your email"
              value={loginVals.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-content-right2">
            <label htmlFor="email" className="emailLabel" className="word-list">
              Password:
            </label>
            <input
              id="Password"
              type="Password"
              name="password"
              className="PassInput2"
              placeholder="Enter your password"
              value={loginVals.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <span className="form-input-login2">
          <button
            className="form-input-btn2"
            type="submit"
            //onClick={() => handleSignUpClick()}
          >
            Login Here
          </button>
          <button
            className="form-input-btn2"
            type="button"
            onClick={() => handleSignUpClick()}
          >
            Need an account? Register here
          </button>
        </span>
      </div>
    </form>
  );
}

export default LoginForm;
