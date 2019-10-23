import React, { Fragment } from "react";
import "./ImageDetection.css";

const ImageDetection = ({ image_url, box }) => {
  return (
    <Fragment>
      <div className="center ma">
        <div className="absolute mt2">
          <img
            id="image"
            src={image_url}
            alt="Detection"
            width="500px"
            height="auto"
          />
          <div
            className="bounding-box"
            style={{
              top: box.top_row,
              right: box.right_col,
              bottom: box.bottom_row,
              left: box.left_col
            }}
          ></div>
        </div>
      </div>
    </Fragment>
  );
};

export default ImageDetection;
