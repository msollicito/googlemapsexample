import { React, useState } from "react";
import useForm from "./useForm";
import validate from "./validateInfo";
import "./Form.css";
import Redirect from "react-router";
import { useHistory } from "react-router-dom";

const Formsignup = ({ submitForm }) => {
  const { handleChange, values, handleSubmit, errors } = useForm(
    submitForm,
    validate
  );

  const history = useHistory();

  const handleSignUpClick = () => {
    //console.log("hello")
    //setFlag(true);
    //console.log("test1");
    history.push("/Login");
    //return (<Redirect push to="/Login" />)
  };

  return (
    <form className="form1" onSubmit={handleSubmit}>
      <h1>THE FLAT FINDER</h1>
      <div className="form-content-right-group">
        <div className="form-content-right">
          <label htmlFor="email" className="emailLabel" className="word-list">
            Email:
          </label>
          <input
            id="email1"
            type="email"
            name="email1"
            className="emailInput"
            placeholder="Enter Email"
            value={values.email1}
            onChange={handleChange}
          />
          {errors.email1 && <p>{errors.email1}</p>}
        </div>
        <div className="form-content-right">
          <label htmlFor="email" className="email-label2" className="word-list">
            Confirm Email:
          </label>
          <input
            id="email2"
            type="email"
            name="email2"
            className="form-label2"
            placeholder="Confirm your Email"
            value={values.email2}
            onChange={handleChange}
          />
          {errors.email2 && <p>{errors.email2}</p>}
        </div>
        <div className="form-content-right">
          <label
            htmlFor="password1"
            className="pass1-label"
            className="word-list"
          >
            Password:
          </label>
          <input
            id="password1"
            type="password"
            name="password1"
            className="form-label"
            placeholder="Enter password"
            value={values.password1}
            onChange={handleChange}
          />
          {errors.password1 && <p>{errors.password1}</p>}
        </div>
        <div className="form-content-right">
          <label
            htmlFor="password2"
            className="password2-label"
            className="word-list"
          >
            Confirm Password:
          </label>
          <input
            id="password2"
            type="password"
            name="password2"
            className="form-label"
            placeholder="Confirm your password"
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <div className="form-content-right">
          <label
            htmlFor="EmployeeID"
            className="EmployeeID-label"
            className="word-list"
          >
            Employee number:
          </label>
          <input
            id="EmployeeID"
            type="EmployeeID"
            name="EmployeeID"
            className="form-label"
            placeholder="Enter Employee ID"
            value={values.EmployeeID}
            onChange={handleChange}
          />
          {errors.EmployeeID && <p>{errors.EmployeeID}</p>}
        </div>
      </div>
      <button className="form-input-btn" type="submit">
        Sign Up
      </button>
      <span className="form-input-login">
        <button
          className="form-input-btn2"
          type="button"
          onClick={() => handleSignUpClick()}
        >
          Already Registered? Login Here
        </button>
      </span>
    </form>
  );
};

export default Formsignup;
