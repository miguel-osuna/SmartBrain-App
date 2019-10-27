import React, { Fragment } from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    <Fragment>
      {isSignedIn ? (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <input
            type="submit"
            onClick={() => onRouteChange("signout")}
            // className="white b br3 ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib"
            className="white bn ph5 pv4 pa3 pr5 pb3 ba bg-transparent f3 dib pointer link"
            value="Sign Out"
          />
        </nav>
      ) : (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <input
            type="submit"
            onClick={() => onRouteChange("signin")}
            // className="white b br3 ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib"
            className="white bn ph5 pv4 pa3 pr5 pb3 ba bg-transparent f3 dib pointer link"
            value="Sign In"
          />

          <input
            type="submit"
            onClick={() => onRouteChange("register")}
            // className="white b br3 ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib"
            className="white bn ph5 pv4 pa3 pr5 pb3 ba bg-transparent f3 dib pointer link"
            value="Register"
          />
        </nav>
      )}
    </Fragment>
  );
};

export default Navigation;
