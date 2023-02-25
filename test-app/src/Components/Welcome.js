import React, { useContext } from "react";
import appContext from "../Context/context";

const Welcome = () => {
  const { userData } = useContext(appContext);
  let profileData = JSON.parse(localStorage.getItem("userData")) || {};

  const filterData = userData.filter((item, i) => item.id === profileData?.id);

  return (
    <>
      <div className="d-flex justify-content-center">
        <h2>
          Welcome!{" "}
          <span style={{ fontWeight: "500", color: "#1d2345 " }}>
            {filterData[0].fname + " " + filterData[0].lname}
          </span>
        </h2>
      </div>
    </>
  );
};

export default Welcome;
