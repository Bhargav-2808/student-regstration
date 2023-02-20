import React from "react";

import banner from "../Images/banner.jpg";

const Home = () => {

  return (
    <>
      <div className="d-flex justify-content-center">
        <img src={banner} alt="banner" className="banner-img" />
      </div>
    </>
  );
};

export default Home;
