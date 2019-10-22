import React, { Fragment } from "react";
import Tilt from "react-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <Fragment>
      <div className="ma5 mt0">
        <Tilt
          className="Tilt br2 shadow-2"
          options={{ max: 50 }}
          style={{ height: 150, width: 150 }}
        >
          <div className="Tilt-inner">
            <img src={brain} alt="SmartBrain" style={{ paddingTop: "5px" }} />
          </div>
        </Tilt>
      </div>
    </Fragment>
  );
};

export default Logo;
