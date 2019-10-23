import React, { Fragment } from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit, onEnterSubmit }) => {
  return (
    <Fragment>
      <div>
        <p className="f3 white solid ">
          {"This app will detect your image's faces"}
        </p>
        <div className="center">
          <div className="center form pa4 br3 shadow-5">
            <input
              className="f4 pa2 w-70 center"
              type="text"
              placeholder="Enter your link"
              onChange={onInputChange}
              onKeyDown={onEnterSubmit}
            />
            <button
              className="w-30 grow f4 link ph3 pv2 dib white bg-light-blue"
              onClick={onButtonSubmit}
            >
              {" "}
              Detect{" "}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ImageLinkForm;
