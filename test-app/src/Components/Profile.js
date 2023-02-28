import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import appContext from "../Context/context";
import profilePic from "../Images/profilePic.png";
import { axiosInstance } from "../services/api";

const Profile = () => {
  const { getProfile, profileData } = useContext(appContext);

  console.log(profileData);

  useEffect(() => {
    getProfile();
  }, []);

  const imageName = profileData?.pic?.split("Images/")[1];
  console.log(imageName);

  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <div className="card-style">
          <div className="d-flex justify-content-center">
            {imageName !== undefined ? (
              <img src={`/Images/${imageName}`} width="100" height="150" />
            ) : (
              <img alt="profilePic" src={profilePic} width="100" height="150" />
            )}
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
