import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import appContext from "../Context/context";
import LoginModal from "./Form/LoginModal";
import RegisterModal from "./Form/RegisterModal";
import "./style.css";
import UpdateModal from "./Form/UpdateModal";
import PasswordModal from "./Form/PasswordModal";
import { IconButton } from "@mui/material";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import SideBar from "./SideBar";

const Header = () => {
  const {
    setLoginShow,
    setRegisterShow,
    isAdmin,
    setIsAdmin,
    setUpdateShow,
    updateShow,
    passwordShow,
    setPasswordShow,
    profileData,
   
    userProfileData,
    openSideBar,
    setOpenSideBar,
    getCustomerData,
    getUserProfile,
    profile,
  } = useContext(appContext);

  const nav = useNavigate();
  const logout = () => {
    setIsAdmin(null);
    localStorage.removeItem("userData");
    nav("/");
    toast.success("User logged out Successfully");
  };
  useEffect(() => {
    if (isAdmin === true) 
    {
      getUserProfile()
    }
    
    if(updateShow)
    {
      getCustomerData();
    };
  }, []);

  console.log(profileData?.id);

  return (
    <>
      <Navbar style={{ backgroundColor: "#becce9" }}>
        <Container>
          <Nav>
            {isAdmin && (
              <IconButton
                onClick={() => {
                  setOpenSideBar(true);
                }}
              >
                <DensitySmallIcon />
              </IconButton>
            )}
            <NavLink
              className="ms-3 navs"
              onClick={() => {
                nav("/");
              }}
            >
              Home
            </NavLink>
            {isAdmin && (
              <>
                <NavLink
                  className=" ms-3 navs"
                  onClick={() => {
                    nav("/admin");
                  }}
                >
                  Admin
                </NavLink>
              </>
            )}
            {isAdmin === false && (
              <>
                <NavLink
                  className=" ms-3 navs"
                  onClick={() => {
                    nav("/welcome");
                  }}
                >
                  Welcome
                </NavLink>
              </>
            )}
          </Nav>

          <Nav className="ms-auto">
            <div className="p-2">
              {(isAdmin === undefined || isAdmin === null) && (
                <>
                  <Button
                    className="nav-btn"
                    onClick={() => {
                      setLoginShow(true);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    className="nav-btn ms-2"
                    onClick={() => {
                      setRegisterShow(true);
                    }}
                  >
                    Register
                  </Button>
                </>
              )}

        

              <div className="d-flex">
              {isAdmin === false && (
                <Button
                  className="nav-btn ms-2"
                  onClick={() => {
                    getCustomerData();
                    setUpdateShow(true);
                  }}
                >
                  Update
                </Button>
              )}
                {isAdmin === true && (
                  <>
                    {
                      <div
                        className="profile"
                        onClick={() => {
                          nav("/profile");
                        }}
                      >
                        <p>
                          {profile.fullname.split(" ")[0][0] +
                            profile.fullname.split(" ")[1][0]}
                        </p>
                      </div>
                    }
                  </>
                )}
                {(isAdmin === true || isAdmin === false) && (
                  <Button className="nav-btn ms-5" onClick={logout}>
                    Logout{" "}
                  </Button>
                )}
              </div>
            </div>
          </Nav>
        </Container>
      </Navbar>
      <LoginModal />
      <RegisterModal />
      {updateShow && <UpdateModal updateKey={profileData?.id}/>}
      {passwordShow && <PasswordModal id={profileData?.id} />}
      {openSideBar && <SideBar />}
    </>
  );
};

export default Header;
