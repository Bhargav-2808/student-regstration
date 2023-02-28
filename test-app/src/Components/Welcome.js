import React, { useContext } from "react";
import appContext from "../Context/context";

const Welcome = () => {
  let profileData = JSON.parse(localStorage.getItem("userData")) || {};

  return (
    <>
      <div className="d-flex justify-content-center">
        <h2>
          Welcome!{" "}
          <span style={{ fontWeight: "500", color: "#1d2345 " }}>
            {profileData.fullname}
          </span>
        </h2>
      </div>
    </>
  );
};

export default Welcome;
