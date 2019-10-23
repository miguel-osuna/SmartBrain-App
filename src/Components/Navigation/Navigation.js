import React, { Fragment } from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    <Fragment>
      {isSignedIn ? (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={() => onRouteChange("signout")}
            className="f3 dim link white pa3 pr5 pb3 pointer"
          >
            Sign Out
          </p>
        </nav>
      ) : (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={() => onRouteChange("signin")}
            className="f3 dim link white pa3 pr5 pb3 pointer"
          >
            Sign In
          </p>

          <p
            onClick={() => onRouteChange("register")}
            className="f3 dim link white pa3 pr5 pb3 pointer"
          >
            Register
          </p>
        </nav>
      )}
    </Fragment>
  );
};

export default Navigation;
