import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import appContext from "../../Context/context";
import { axiosInstance } from "../../services/api";

const UpdateModal = ({ updateKey }) => {
  const {
    userData,
    setUserData,
    setUpdateShow,
    getUserData,
    updateShow,

    setIsAdmin,
  } = useContext(appContext);

  const filterData = userData.filter((item, i) => item.id === updateKey);

  const [data, setData] = useState(filterData[0]);

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    if (key === "mobile") {
      if (value.length <= 10) {
        setData((prevState) => {
          return {
            ...prevState,
            [e.target.name]: e.target.value,
          };
        });
      }
    } else if (key === "pincode") {
      if (value.length <= 6) {
        setData((prevState) => {
          return {
            ...prevState,
            [e.target.name]: e.target.value,
          };
        });
      }
    } else {
      setData((prevState) => {
        return {
          ...prevState,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const isValidPwd = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w!@#$%^&*?~()-]{8,}$/;
    if (re.test(password)) {
      return true;
    }
  };

  const submitData = async () => {
    if (
      data.mobile === "" ||
      data.add1 === "" ||
      data.Cpassword === "" ||
      data.password === "" ||
      data.pincode === "" ||
      data.fname === "" ||
      data.lname === ""
    ) {
      toast.warning("All Field are Required");
    } else if (data.mobile.length !== 10) {
      toast.warning("Enter Valid Mobile");
    } else if (!isValidPwd(data.password)) {
      toast.warning("Password should be in Valid Formate..");
    } else if (data.password !== data.Cpassword) {
      toast.warning("Both password should be same! ");
    } else if (data.pincode.length !== 6) {
      toast.warning("Enter Valid Pincode");
    } else {
      await axiosInstance
        .put(`/edit/${updateKey}`, data)
        .then((res) => {
          toast.success(res.data.sucess);
        })
        .catch((e) => {
          toast.error(e.response.data);
        });

      getUserData();
      setUpdateShow(false);
    }
  };

  return (
    <>
      <Modal
        show={updateShow}
        onHide={() => {
          setUpdateShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>{" "}
                    <Form.Control
                      type="text"
                      className="fcontrol"
                      name="fname"
                      value={data?.fname}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>{" "}
                    <Form.Control
                      type="text"
                      className="fcontrol"
                      name="lname"
                      value={data?.lname}
                      onChange={handleChange}
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
                      name="email"
                      value={data?.email}
                      className="fcontrol"
                      placeholder="xyz@gmail.com"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    {" "}
                    <Form.Label>Mobile Number</Form.Label>{" "}
                    <Form.Control
                      type="number"
                      value={data?.mobile}
                      className="fcontrol"
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
                      type="text"
                      name="add1"
                      className="fcontrol"
                      value={data?.add1}
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
                      name="add2"
                      className="fcontrol"
                      value={data?.add2}
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
                      value={data?.pincode}
                      className="fcontrol"
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
                      name="password"
                      className="fcontrol"
                      value={data?.password}
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
                      value={data?.Cpassword}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button className="nav-btn" onClick={submitData}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateModal;
