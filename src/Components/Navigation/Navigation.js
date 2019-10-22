import React, { Fragment } from "react";

const Navigation = () => {
  return (
    <Fragment>
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p className="f3 dim link white pa3 pr5 pb3 pointer">Sign Out</p>
      </nav>
    </Fragment>
  );
};

export default Navigation;
