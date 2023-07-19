import { useState, useEffect } from "react";
//import firebase from "./firebase";
import { useAuth } from "./contexts/authcontext";

const useForm = (callback, validate, validate2) => {
  const { signup } = useAuth();

  const [values, setValues] = useState({
    email1: "",
    email2: "",
    password1: "",
    password2: "",
    EmployeeID: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  async function submitFunct() {
    setErrors(validate(values));
    setIsSubmitting(true);

    if (Object.keys(errors).length === 0) {
      /*const itemsRef = firebase.database().ref("users");
    const user = {
      username: values.email2,
      password: values.password2,
      employeeID: values.EmployeeID
    };
    itemsRef.push(user);*/
      try {
        await signup(values.email2, values.password2);
        console.log("user submitted");
        setValues({
          email1: "",
          email2: "",
          password1: "",
          password2: "",
          EmployeeID: ""
        });
      } catch {
        console.log("ERROR: Problem with Firebase User Signup");
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFunct();
  };

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
