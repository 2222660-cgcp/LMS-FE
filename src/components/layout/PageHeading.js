import "./PageHeading.css";
import React from "react";

// --------------------------ANAGHA.S.R--------------------------------

const PageHeading = (props) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h3 className="text-center mt-4">{props.heading}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHeading;
