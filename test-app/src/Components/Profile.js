import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import appContext from "../Context/context";
import profilePic from "../Images/profilePic.png";
import { axiosInstance } from "../services/api";

const Profile = () => {
  let pro;
  const { getProfile, profileData, isAdmin, getUserProfile, userProfileData } =
    useContext(appContext);

  useEffect(() => {
    if (isAdmin === true) getUserProfile();
  }, []);

  if (isAdmin === true) pro = userProfileData;

  const imageName = userProfileData?.pic?.split("Images/")[1];

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
              <b>Name:</b> {pro.fname +" "+pro.lname}
            </p>

            <p>
              {" "}
              <b>Email :</b> {pro.email}
            </p>
            <p>
              {" "}
              <b>Mobile No :</b> {pro.mobile}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
