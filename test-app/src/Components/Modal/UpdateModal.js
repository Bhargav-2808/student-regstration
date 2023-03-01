import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import appContext from "../../Context/context";
import { axiosInstance } from "../../services/api";

const UpdateModal = ({ updateKey }) => {
  const user = JSON.parse(localStorage.getItem("userData"));
  // console.log(updateKey);
  const {
    userData,
    setUserData,
    setUpdateShow,
    getUserData,
    updateShow,
    profileData,

    getProfile,
  } = useContext(appContext);

  let filterData;
  
  if (userData?.length === 0) {
    filterData = profileData;
  } else {
    filterData = userData.filter((item) => item.id === parseInt(updateKey))[0];
  }

  const [data, setData] = useState(filterData);
  const formData = new FormData();

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

  const submitData = () => {
    if (
      data.mobile === "" ||
      data.add1 === "" ||
      data.pincode === "" ||
      data.fname === "" ||
      data.lname === ""
    ) {
      toast.warning("All Field are Required");
    } else if (data.mobile.length !== 10) {
      toast.warning("Enter Valid Mobile");
    }
    // else if (
    //   data.pic &&
    //   (data.pic.type.split("/")[1] !== "jpg" ||
    //     data.pic.type.split("/")[1] !== "jpeg" ||
    //     data.pic.type.split("/")[1] !== "png")
    // ) {
    //   toast.warning("enter file in valid formate");
    // }
    else if (data.pincode.length !== 6) {
      toast.warning("Enter Valid Pincode");
    } else {
      formData.append("fname", data.fname);
      formData.append("lname", data.lname);
      formData.append("mobile", data.mobile);
      formData.append("email", data.email);
      formData.append("add1", data.add1);
      formData.append("add2", data.add2);
      formData.append("pincode", data.pincode);
      formData.append("pic", data.pic);
      const token = user?.token;
      axios
        .put(`http://localhost:5555/user/edit/${updateKey}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.sucess);
        })
        .catch((e) => {
          toast.error(e.response.data);
        });
      getProfile();
      getUserData();
      setUpdateShow(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Modal
        show={updateShow}
        onHide={() => {
          setUpdateShow(false);
        }}
      >
    <Modal.Header style={{justifyContent:"center"}}>
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
                      value={data?.pincode}
                      className="fcontrol"
                      name="pincode"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:"#becce9"}}>
          <Button className="nav-btn" onClick={submitData}>
            Update
          </Button>
          <Button className="cancel-btn" onClick={()=>{setUpdateShow(false)}}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateModal;
