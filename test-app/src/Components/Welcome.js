import React, { useContext, useEffect } from "react";
import appContext from "../Context/context";
import profilePic from "../Images/profilePic.png";


const Welcome = () => {
  const { getProfile, profileData, isAdmin, getUserProfile, userProfileData } =
    useContext(appContext);
  const imageName = profileData?.pic?.split("Images/")[1];

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-center flex-column align-items-center mt-5">
        <h2>
          Welcome!{" "}
          <span style={{ fontWeight: "500", color: "#1d2345 " }}>
            {profileData.fname + " " + profileData.lname}
          </span>
        </h2>
        <div className="d-flex justify-content-center mt-3">
          <div className="card-style">
            <div className="d-flex justify-content-center">
              {imageName !== undefined ? (
                <img src={`/Images/${imageName}`} width="100" height="150" />
              ) : (
                <img
                  alt="profilePic"
                  src={profilePic}
                  width="100"
                  height="150"
                />
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
            
                <>
                  <p>
                    {" "}
                    <b>Address Line 2 </b>: {profileData.add2 ? profileData.add2 : "-"}
                  </p>
                  <p>
                    {" "}
                    <b>PinCode :</b> {profileData.pincode}
                  </p>
                </>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
