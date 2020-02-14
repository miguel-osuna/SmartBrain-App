import React, { Fragment } from "react";
import ProfileIcon from "../ProfileIcon/ProfileIcon";

const Navigation = ({
  onRouteChange,
  isSignedIn,
  toggleModal,
  delAuthTokenInSessions
}) => {
  return (
    <Fragment>
      {isSignedIn ? (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <ProfileIcon
            onRouteChange={onRouteChange}
            toggleModal={toggleModal}
            delAuthTokenInSessions={delAuthTokenInSessions}
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
