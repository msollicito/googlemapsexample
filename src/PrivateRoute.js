import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./contexts/authcontext";

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  //const { loggedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/Login" />
        );
      }}
    ></Route>
  );
}

export default PrivateRoute;
