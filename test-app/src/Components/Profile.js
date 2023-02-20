import React from "react";
import { Card } from "react-bootstrap";
import profilePic from "../Images/profilePic.png";

const Profile = () => {
  let profileData = JSON.parse(localStorage.getItem("userData")) || {};

  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <div className="card-style">
          <div className="d-flex justify-content-center">
            <img alt="profilePic" src={profilePic} width="100" height="150" />
          </div>
          <div className="mt-2 p-2">
            <p>
              <b>Name:</b> {profileData.fname + " " + profileData.lname}
            </p>

            <p>
              {" "}
              <b>Email :</b> {profileData.email}
            </p>
            <p>
              {" "}
              <b>Mobile No :</b> {profileData.mobile}
            </p>
            <p>
              {" "}
              <b>Address Line 1 :</b> {profileData.add1}
            </p>
            <p>
              {" "}
              <b>Address Line 2 </b>:{" "}
              {profileData.add2 ? profileData.add2 : "-"}
            </p>
            <p>
              {" "}
              <b>PinCode :</b> {profileData.pincode}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
