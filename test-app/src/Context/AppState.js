import React, { useState } from "react";
import AppContext from "./context";

const AppState = ({ children }) => {
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [updateKey, setUpdateKey] = useState("");
  const admin = localStorage.getItem("user");
  const [isAdmin , setIsAdmin] = useState(admin);
  const [loading , setLoading] = useState(true);
  const [x,setX] = useState(0);


   const [userData,setUserData] = useState([]);
  const getUserData = () => {
    const allData = JSON.parse(localStorage.getItem("data")) || [];
    setUserData(allData);
    setLoading(false);
  };  

  const setDataInLocalStorage  = (allUsers = userData) =>{
    localStorage.setItem("data",JSON.stringify(allUsers))
    getUserData();
  }


    console.log(x,"context");
  //  console.log(admin,isAdmin,"AdminDAta");

  return (
    <AppContext.Provider
      value={{
        loginShow,
        setLoginShow,
        registerShow,
        setRegisterShow,
        userData,
        setDataInLocalStorage,
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
        x,setX
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
