import React, { useContext, useEffect } from "react";
import { Button, Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import appContext from "../Context/context";
import LoginModal from "./Form/LoginModal";
import RegisterModal from "./Form/RegisterModal";
import profile from "../Images/profile.png";
import "./style.css";
import UpdateModal from "./Form/UpdateModal";
import PasswordModal from "./Form/PasswordModal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";

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
    getProfile,
  } = useContext(appContext);

  const nav = useNavigate();
  const logout = () => {
    setIsAdmin(null);
    localStorage.removeItem("userData");
    nav("/");
    toast.success("User logged out Successfully");
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      <Navbar style={{ backgroundColor: "#becce9" }}>
        <Container>
          <Nav>
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
                </>
              )}

              <Button
                className="nav-btn ms-2"
                onClick={() => {
                  isAdmin === false
                    ? setUpdateShow(true)
                    : setRegisterShow(true);
                }}
              >
                {isAdmin === false ? "Update" : "Register"}
              </Button>

              {(isAdmin === false || isAdmin === true) && (
                <>
                  <Button
                    className="nav-btn"
                    onClick={() => {
                      setPasswordShow(true);
                    }}
                  >
                    Update Password
                  </Button>
                  <IconButton
                    onClick={() => {
                      nav("/profile");
                    }}
                  >
                    <AccountCircleIcon style={{ fontSize: "2rem" }} />
                  </IconButton>

                  <Button className="nav-btn ms-5" onClick={logout}>
                    Logout{" "}
                  </Button>
                </>
              )}
            </div>
          </Nav>
        </Container>
      </Navbar>
      <LoginModal />
      <RegisterModal />
      {updateShow && <UpdateModal updateKey={profileData?.id} />}
      {passwordShow && <PasswordModal id={profileData?.id} />}
    </>
  );
};

export default Header;
