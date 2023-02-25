import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import appContext from "../Context/context";
import profilePic from "../Images/profilePic.png";

const Profile = () => {
  const { userData } = useContext(appContext);
  let profileData = JSON.parse(localStorage.getItem("userData")) || {};


  const filterData = userData.filter((item, i) => item.id === profileData?.id);


  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <div className="card-style">
          <div className="d-flex justify-content-center">
            <img alt="profilePic" src={profilePic} width="100" height="150" />
          </div>
          <div className="mt-2 p-2">
            <p>
              <b>Name:</b> {filterData[0].fname + " " + filterData[0].lname}
            </p>

            <p>
              {" "}
              <b>Email :</b> {filterData[0].email}
            </p>
            <p>
              {" "}
              <b>Mobile No :</b> {filterData[0].mobile}
            </p>
            <p>
              {" "}
              <b>Address Line 1 :</b> {filterData[0].add1}
            </p>
            <p>
              {" "}
              <b>Address Line 2 </b>:{" "}
              {filterData[0].add2 ? filterData[0].add2 : "-"}
            </p>
            <p>
              {" "}
              <b>PinCode :</b> {filterData[0].pincode}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
