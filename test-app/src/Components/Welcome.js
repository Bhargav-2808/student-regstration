import React from "react";

const Welcome = () => {
  let profileData = JSON.parse(localStorage.getItem("userData")) || {};

  return (
    <>
      <div className="d-flex justify-content-center">
        <h2>
          Welcome!{" "}
          <span style={{ fontWeight: "500", color: "#1d2345 " }}>
            {profileData.fname + " " + profileData.lname}
          </span>
        </h2>
      </div>
    </>
  );
};

export default Welcome;
