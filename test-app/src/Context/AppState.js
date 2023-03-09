import axios from "axios";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../services/api";
import AppContext from "./context";

const AppState = ({ children }) => {
  let adminField = JSON.parse(localStorage.getItem("userData"));
  let profile = JSON.parse(localStorage.getItem("userData")) || {};
  const [loginShow, setLoginShow] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [updateKey, setUpdateKey] = useState("");
  const [isAdmin, setIsAdmin] = useState(adminField?.isAdmin);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(null);
  const [count, setCount] = useState(null);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [userProfileData, setUserProfileData] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const [intialProduct, setIntialProduct] = useState({});
  const [productUpdateKey, setProductUpdateKey] = useState(null);
  const [adminData, setAdminData] = useState([]);

  const config = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${adminField?.token}`,
  };

  const getCustomerData = async (page = 0, size = 3, search = "") => {
    const data = await axios.get(
      `http://localhost:5555/customer?page=${page}&size=${size}&search=${search}`,
      {
        headers: config,
      }
    );
    const allData = data?.data.data.rows;
    setUserData(allData);
    setCount(data?.data?.data?.count);
    setTotalPage(data.data.totalPage);
    setLoading(false);
  };

  const getProductData = async (page = 0, size = 3, search = "") => {
    const data = await axios.get(
      `http://localhost:5555/product?page=${page}&size=${size}&search=${search}`,
      {
        headers: config,
      }
    );
    const allData = data?.data.data.rows;
    setProductData(allData);
    setCount(data?.data?.data?.count);
    setTotalPage(Math.ceil(data?.data?.data?.count / size));
    setLoading(false);
  };

  // const getProduct = async (updateKey) => {

  //   const data = await axios.get(
  //     `http://localhost:5555/product/product/${updateKey}`,
  //     {
  //       headers: config,
  //     }
  //   );

  //   setIntialProduct(data.data);
  // };
  const getProfile = async () => {
    const data = await axios.get(
      `http://localhost:5555/customer/profile/${profile.id}`,
      {
        headers: config,
      }
    );

    setProfileData(data?.data);
  };

  const getUserProfile = async () => {
    const data = await axios.get(
      `http://localhost:5555/user/profile/${profile.id}`,
      {
        headers: config,
      }
    );

    setUserProfileData(data?.data);
  };

  const filterUserPermission = userProfileData?.permissions?.filter((item) => {
    return item.ruleId === 1;
  })[0];

  const filterProductPermission = userProfileData?.permissions?.filter(
    (item) => {
      return item.ruleId === 2;
    }
  )[0];

  const getUserData = async (page = 0, size = 3, search = "") => {
    const data = await axios.get(
      `http://localhost:5555/user?page=${page}&size=${size}&search=${search}`,
      {
        headers: config,
      }
    );
    const allData = data?.data.data.rows;

    setAdminData(allData);
    setCount(data?.data?.count);

    setTotalPage(Math.ceil(data?.data?.count / size));
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
        count,
        totalPage,
        updateShow,
        passwordShow,
        setPasswordShow,
        setUpdateShow,
        updateKey,
        getCustomerData,
        setUpdateKey,
        isAdmin,
        setIsAdmin,
        loading,
        setLoading,
        getProfile,
        profileData,
        setProfileData,
        openSideBar,
        setOpenSideBar,
        getUserProfile,
        userProfileData,
        openDrawer,
        setOpenDrawer,
        profile,
        getProductData,
        productData,
        productUpdateKey,
        setProductUpdateKey,
        filterUserPermission,
        filterProductPermission,
        intialProduct,
        getUserData,
        adminData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
