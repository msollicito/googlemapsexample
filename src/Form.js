import React, { useState } from "react";
import "./Form.css";
import FormSignup from "./FormSignup";
import FormSuccess from "./FormSuccess";
/*import Homepage from "./Homepage.js";*/

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className="form-container">
        <div className="form-content-left">
          <img
            src="https://cdn.dribbble.com/users/989466/screenshots/12002010/media/41c270f90ea9e4d1507c3c0fc4922dc3.png?compress=1&resize=400x300"
            className="form-img"
            alt="putpichere"
          />
        </div>
        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
      </div>
    </>
  );
};

export default Form;

/*   {!isSubmitted ? <loginForm submitForm={submitForm} /> : <Homepage />} */

/*<span className="close-btn">×</span>*/
