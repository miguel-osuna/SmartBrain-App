import React, { Fragment } from "react";

const Rank = ({ name, entries }) => {
  return (
    <Fragment>
      <div>
        <div className="pb4">
          <div className="f3 white">{`Hi, ${name}, your entry count is`}</div>
          <div className="f1 white">{`${entries}`}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Rank;
