export default function validateInfo(values) {
  let errors = {};

  if (!values.email1) {
    errors.email1 = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email1)) {
    errors.email1 = "Email address is invalid";
  }
  if (!values.email2) {
    errors.email2 = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email2)) {
    errors.email2 = "Email address is invalid";
  }
  if (!values.password1) {
    errors.password1 = "Password is required";
  } else if (values.password1.length < 6) {
    errors.password1 = "Password needs to be 6 characters or more";
  }

  if (!values.password2) {
    errors.password2 = "Password is required";
  } else if (values.password2 !== values.password1) {
    errors.password2 = "Passwords do not match";
  }
  if (!values.EmployeeID) {
    errors.EmployeeID = "Employee ID required";
  } else if (values.EmployeeID.length < 6) {
    errors.EmployeeID = "Employe ID invalid";
  }
  if (!values.email3) {
    errors.email3 = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email3)) {
    errors.email3 = "Email address is invalid";
  }
  if (!values.password3) {
    errors.password3 = "Password is required";
  } else if (values.password3.length < 6) {
    errors.password3 = "Password needs to be 6 characters or more";
  }
  return errors;
}
