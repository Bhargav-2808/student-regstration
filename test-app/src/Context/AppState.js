import React, { useState } from "react";
import { axiosInstance } from "../services/api";
import AppContext from "./context";

const AppState = ({ children }) => {
  const adminField = JSON.parse(localStorage.getItem("userData"));
  const [loginShow, setLoginShow] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [updateKey, setUpdateKey] = useState("");
  const [isAdmin, setIsAdmin] = useState(adminField?.isAdmin);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(null);
  const [count, setCount] = useState(null);

  let profile = JSON.parse(localStorage.getItem("userData")) || {};
  const [userData, setUserData] = useState([]);
  const [profileData, setProfileData] = useState({});
  const getUserData = async (page = 0, size = 3, search = "") => {
    const data = await axiosInstance.get(
      `?page=${page}&size=${size}&search=${search}`
    );
    const allData = data?.data.data.rows;
    setUserData(allData);
    setCount(data?.data?.data?.count);
    setTotalPage(data.data.totalPage);
    setLoading(false);
  };

  // console.log(profileData);
  const getProfile = async () => {
    const data = await axiosInstance.get(`/profile/${profile.id}`);
    setProfileData(data?.data);
  };
  return (
    <AppContext.Provider
      value={{
        loginShow,
        setLoginShow,
        registerShow,
        setRegisterShow,
        userData,
        count,
        totalPage,
        // setUserData,
        updateShow,
        passwordShow,
        setPasswordShow,
        setUpdateShow,
        updateKey,
        getUserData,
        setUpdateKey,
        isAdmin,
        setIsAdmin,
        loading,
        setLoading,
        getProfile,
        profileData,
        setProfileData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
