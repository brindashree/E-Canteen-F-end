import React from "react"
import {Route, Redirect} from "react-router-dom"
import {isAuthenticated} from "./index"

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const AdminRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={ props =>
            isAuthenticated() && isAuthenticated().user.role === 2 ? (
            <Component {...props}/>
          ) : (
            <Redirect
              to={{
                pathname: "/admin/dashboard",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default AdminRoute;