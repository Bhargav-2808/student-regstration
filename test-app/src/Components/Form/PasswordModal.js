import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import appContext from "../../Context/context";
import CommonModal from "../Modal/CommonModal";

const PasswordModal = ({ id }) => {
  const {
    isAdmin,
    getCustomerData,
    passwordShow,
    setPasswordShow,
    getUserData,
    userProfileData,
  } = useContext(appContext);
  const adminField = JSON.parse(localStorage.getItem("userData"));

  const intialState = {
    password: "",
    cPassword: "",
  };

  const [data, setData] = useState(intialState);
  const isValidPwd = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w!@#$%^&*?~()-]{8,}$/;
    if (re.test(password)) {
      return true;
    }
  };
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
  const submitData = () => {
    if (!data.password && !data.cPassword) {
      toast.warning("All Field are Required");
    } else if (data.password !== data.cPassword) {
      toast.warning("Both Password should be same");
    } else if (!isValidPwd(data.password)) {
      toast.warning("Enter Password in valid formate ");
    } else {
      if (isAdmin === true) {
        axios
          .put(`http://localhost:5555/user/edit/${userProfileData?.id}`, data, {
            headers: config,
          })
          .then((res) => {
            toast.success("Password updated successfully");
          })
          .catch((e) => {
            toast.error(e.message);
          });
        setPasswordShow(false);
        getUserData();
      } else {
        console.log("called1");

        axios
          .put(`http://localhost:5555/customer/edit/${id}`, data, {
            headers: config,
          })
          .then((res) => {
            toast.success("Password updated successfully");
          })
          .catch((e) => {
            toast.error(e.message);
          });
        setPasswordShow(false);
        getCustomerData();
      }
    }
  };

  return (
    <>
      <CommonModal
        show={passwordShow}
        setShow={(val) => {
          setPasswordShow(val);
        }}
        submitData={submitData}
        headerTital="Change Password"
      >
        <Container>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>{" "}
                  <Form.Control
                    type="password"
                    onChange={handleChange}
                    name="password"
                    className="fcontrol"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  {" "}
                  <Form.Label>Confirm Password</Form.Label>{" "}
                  <Form.Control
                    type="password"
                    name="cPassword"
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

export default PasswordModal;
