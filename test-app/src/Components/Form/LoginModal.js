import React, { useContext, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import appContext from "../../Context/context";
import { axiosInstance } from "../../services/api";
import CommonModal from "../Modal/CommonModal";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import axios from "axios";

const LoginModal = () => {
  let result;
  const { loginShow, setLoginShow, setIsAdmin,getUserProfile,getProfile } = useContext(appContext);
  const [alignment, setAlignment] = useState("admin");
  const adminField = JSON.parse(localStorage.getItem("userData"));


  const handleToggel = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const nav = useNavigate();

  const intialState = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(intialState);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const config = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${adminField?.token}`,
  };
  const submitData = async () => {
    if (!data.password && !data.email) {
      toast.warning("All Field are Required");
    } else if (!isValidEmail(data.email)) {
      toast.warning("Enter Valid Email");
    } else {
      if (alignment === "admin") {
        result = await axios
          .post("http://localhost:5555/user/login", data)
          .then()
          .catch((e) => {
            toast.error(e.message);
          });
        setLoginShow(false);
        if (result) {
          toast.success("Admin Logged In Successfully");
        }
        localStorage.setItem("userData", JSON.stringify(result.data));
        getUserProfile();

        setIsAdmin(true);
        nav("/admin");
      } else {
        result = await axios
          .post("http://localhost:5555/customer/login", data)
          .then()
          .catch((e) => {
            toast.error(e.message);
          });
      
        setLoginShow(false);
        if (result) {
          toast.success("Customer Logged In Successfully");
        }

        localStorage.setItem("userData", JSON.stringify(result.data));
        getProfile();

        setIsAdmin(false);
        nav("/welcome");
      }
    }
  };

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      return true;
    }
  };

  return (
    <>
      <CommonModal
        show={loginShow}
        setShow={(val) => {
          setLoginShow(val);
        }}
        submitData={submitData}
        headerTital="Login"
      >
        <Container>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleToggel}
            aria-label="Platform"
          >
            <ToggleButton value="customer">Customer</ToggleButton>
            <ToggleButton value="admin">Admin</ToggleButton>
          </ToggleButtonGroup>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>{" "}
                  <Form.Control
                    type="email"
                    onChange={handleChange}
                    name="email"
                    className="fcontrol"
                    placeholder="name@example.com"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  {" "}
                  <Form.Label>Password</Form.Label>{" "}
                  <Form.Control
                    type="password"
                    name="password"
                    className="fcontrol"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Container>
      </CommonModal>
    </>
  );
};

export default LoginModal;
