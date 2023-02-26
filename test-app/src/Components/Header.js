import React, { useContext } from "react";
import { Button, Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import appContext from "../Context/context";
import LoginModal from "./Modal/LoginModal";
import RegisterModal from "./Modal/RegisterModal";
import profile from "../Images/profile.png";
import "./style.css";
import UpdateModal from "./Modal/UpdateModal";

const Header = () => {
  const { setLoginShow, setRegisterShow, isAdmin, setIsAdmin, setUpdateShow,updateShow } =
    useContext(appContext);
  const data  = JSON.parse(localStorage.getItem("userData"));
  const nav = useNavigate();
  const logout = () => {
    setIsAdmin(null);
    localStorage.removeItem("userData");
    nav("/");
    toast.success("User logged out Successfully");
  };


  return (
    <>
      <Navbar style={{ backgroundColor: "#1d2345" }} variant="dark">
        <Container>
          <Nav>
            <NavLink
              className="ms-3"
              style={{ color: "white" }}
              onClick={() => {
                nav("/");
              }}
            >
              Home
            </NavLink>
            {isAdmin && (
              <>
                <NavLink
                  className=" ms-3"
                  style={{ color: "white" }}
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
                className="nav-btn"
                onClick={() => {
                  isAdmin === false ? setUpdateShow(true) : setRegisterShow(true)
                }}
              >
                {isAdmin === false ? "Update" : "Register"}
              </Button>

              {(isAdmin === false || isAdmin === true) && (
                <>
                  <img
                    src={profile}
                    alt="profile"
                    className="ms-5"
                    onClick={() => {
                      nav("/profile");
                    }}
                  />
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
      {updateShow && <UpdateModal updateKey={data?.id} />}

    </>
  );
};

export default Header;
