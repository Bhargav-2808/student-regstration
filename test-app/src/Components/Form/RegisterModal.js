import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Form } from "react-bootstrap";
import {} from "react-router-dom";
import { toast } from "react-toastify";
import appContext from "../../Context/context";
import { axiosInstance } from "../../services/api";
import CommonModal from "../Modal/CommonModal";

const RegisterModal = () => {
  const { registerShow, setRegisterShow, userData, getUserData } =
    useContext(appContext);

  const intialState = {
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    add1: "",
    add2: "",
    pincode: "",
    password: "",
    Cpassword: "",
    pic: "",
  };

  const [data, setData] = useState(intialState);
  const formData = new FormData();
  const handleChange = (e) => {
    let value =
      e.target.name === "email" ? e.target.value.toLowerCase() : e.target.value;

    const key = e.target.name;

    if (key === "mobile") {
      if (value.length <= 10) {
        setData((prevState) => {
          return {
            ...prevState,
            [key]: e.target.value,
          };
        });
      }
    } else if (key === "pincode") {
      if (value.length <= 6) {
        setData((prevState) => {
          return {
            ...prevState,
            [key]: e.target.value,
          };
        });
      }
    } else if (key === "pic") {
      setData((prevState) => {
        return {
          ...prevState,
          [key]: e.target.files[0],
        };
      });
    } else {
      setData((prevState) => {
        return {
          ...prevState,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      return true;
    }
  };

  const isValidPwd = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w!@#$%^&*?~()-]{8,}$/;
    if (re.test(password)) {
      return true;
    }
  };

  const submitData = () => {
    if (
      data.mobile === "" ||
      data.add1 === "" ||
      data.Cpassword === "" ||
      data.password === "" ||
      data.pincode === "" ||
      data.email === "" ||
      data.fname === "" ||
      data.lname === ""
    ) {
      toast.warning("All Field are Required");
    } else if (data.mobile.length !== 10) {
      toast.warning("Enter Valid Mobile");
    } else if (!isValidEmail(data.email)) {
      toast.warning("Enter Valid Email");
    } else if (!isValidPwd(data.password)) {
      toast.warning("Password should be in Valid Formate..");
    } else if (data.pincode.length !== 6) {
      toast.warning("Enter Valid Pincode");
    } else if (data.password !== data.Cpassword) {
      toast.warning("Both password should be same! ");
    } else {
      formData.append("fname", data.fname);
      formData.append("lname", data.lname);
      formData.append("mobile", data.mobile);
      formData.append("email", data.email);
      formData.append("add1", data.add1);
      formData.append("add2", data.add2);
      formData.append("pincode", data.pincode);
      formData.append("password", data.password);
      formData.append("pic", data?.pic ?? null);

      axios
        .post(`http://localhost:5555/customer/register`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toast.success("user registered successfully");
        })
        .catch((e) => {
          // console.log(e.response.data.error);
          toast.error(e.response.data.error);
        });
      getUserData();

      setRegisterShow(false);
    }
  };

  if (registerShow === false) {
    data.mobile = "";
    data.pincode = "";
    data.Cpassword = "";
    data.fname = "";
    data.lname = "";
    data.add1 = "";
    data.add2 = "";
    data.email = "";
    data.password = "";
  }

  return (
    <>
      <CommonModal
        show={registerShow}
        setShow={(val) => {
          setRegisterShow(val);
        }}
        submitData={submitData}
        headerTital="Sign Up"
      >
        <Container>
          <form onSubmit={(e) => e.preventDefault()} action="/" method="post">
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>{" "}
                  <Form.Control
                    type="text"
                    className="fcontrol"
                    name="fname"
                    onChange={handleChange}
                    value={data.fname}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>{" "}
                  <Form.Control
                    className="fcontrol"
                    type="text"
                    name="lname"
                    onChange={handleChange}
                    value={data.lname}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>{" "}
                  <Form.Control
                    type="email"
                    onChange={handleChange}
                    value={data.email}
                    className="fcontrol"
                    name="email"
                    placeholder="xyz@gmail.com"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  {" "}
                  <Form.Label>Mobile Number</Form.Label>{" "}
                  <Form.Control
                    type="number"
                    className="fcontrol"
                    value={data.mobile}
                    name="mobile"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Form.Group className="mb-3">
                  {" "}
                  <Form.Label>Address Line 1</Form.Label>{" "}
                  <Form.Control
                    className="fcontrol"
                    type="text"
                    name="add1"
                    value={data.add1}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  {" "}
                  <Form.Label>Address Line 2</Form.Label>{" "}
                  <Form.Control
                    type="text"
                    className="fcontrol"
                    name="add2"
                    value={data.add2}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  {" "}
                  <Form.Label>Profile Pic</Form.Label>{" "}
                  <Form.Control
                    type="file"
                    className="fcontrol"
                    name="pic"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Form.Group className="mb-3">
                  {" "}
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="number"
                    className="fcontrol"
                    value={data.pincode}
                    name="pincode"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  {" "}
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    className="fcontrol"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  {" "}
                  <Form.Label>Confirm Password</Form.Label>{" "}
                  <Form.Control
                    type="password"
                    name="Cpassword"
                    className="fcontrol"
                    value={data.Cpassword}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </form>
        </Container>
      </CommonModal>
    </>
  );
};

export default RegisterModal;
