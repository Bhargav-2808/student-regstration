import React, { useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../services/api";
import AppContext from "./context";

const AppState = ({ children }) => {
  const adminField = JSON.parse(localStorage.getItem("userData"));
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [updateKey, setUpdateKey] = useState("");
  const [isAdmin, setIsAdmin] = useState(adminField?.isAdmin);
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState([]);
  const getUserData = async () => {
    const data = await axiosInstance
      .get()
      .then()
      .catch((e) => {
        toast.error(e.message);
      });
    const allData = data?.data.data.rows;
    setUserData(allData);
    setLoading(false);
  };



  return (
    <AppContext.Provider
      value={{
        loginShow,
        setLoginShow,
        registerShow,
        setRegisterShow,
        userData,

        // setUserData,
        updateShow,
        setUpdateShow,
        updateKey,
        getUserData,
        setUpdateKey,
        isAdmin,
        setIsAdmin,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
