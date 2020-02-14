import React, { Fragment } from "react";

const Rank = ({ name, entries, faces }) => {
  return (
    <Fragment>
      <div>
        <div className="pb4">
          <div className="f3 white">{`Hi, ${name}, your entry count is ${entries}`}</div>
          <div className="f3 white">{`Faces detected: ${faces}`} </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Rank;
