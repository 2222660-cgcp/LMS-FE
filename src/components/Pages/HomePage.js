import React, { useEffect, useState } from "react";
import library from "../asset/library.jpg";
import "./HomePage.css";
import Header from "../layout/Header";

// --------------------------IBRAHIM BADSHAH--------------------------------
const HomePage = () => {
  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = "#loaded";
      window.location.reload();
    }
  }, []);
  return (
    <>
      <div
        className="homepage-container"
        style={{ backgroundImage: `url(${library})` }}
      >
        {" "}
        <Header />
      </div>
    </>
  );
};

export default HomePage;
