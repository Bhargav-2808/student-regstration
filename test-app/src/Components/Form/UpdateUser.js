import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import appContext from "../../Context/context";

const UpdateUser = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  const {
    setOpenDrawer,
    getUserData,
    productUpdateKey,
    setProductUpdateKey,
    adminData,
  } = React.useContext(appContext);

  const filterData = adminData.filter((item) => {
    return item.id === productUpdateKey;
  })[0];

  console.log(filterData);
  const filterUserRule = filterData?.permissions?.filter((item) => {
    return parseInt(item.ruleId) === 1;
  })[0];

  const filterProductRule = filterData?.permissions?.filter((item) => {
    return parseInt(item.ruleId) === 2;
  })[0];

  const initialState = {
    fname: filterData.fname,
    lname: filterData.lname,
    email: filterData.email,
    mobile: filterData.mobile,
    rulesData: [
      {
        rule: "users",
        permit:
          filterUserRule.permission === null
            ? null
            : filterUserRule.permission === true
            ? true
            : false,
      },
      {
        rule: "products",
        permit:
          filterProductRule.permission === null
            ? null
            : filterProductRule.permission === true
            ? true
            : false,
      },
    ],
  };

  const [data, setData] = useState(initialState);

  console.log(data, "data");
  const handleChange = (e) => {
    let value =
      e.target.name === "email" ? e.target.value.toLowerCase() : e.target.value;

    const name = e.target.name;

    if (name === "mobile") {
      if (value.length <= 10) {
        setData((prevState) => {
          return {
            ...prevState,
            [name]: e.target.value,
          };
        });
      }
    } else if (name === "users") {
      const newRules = [...data.rulesData];

      newRules[0].permit = value === "No Permission" ? null : value;

      setData((item) => {
        return { ...item, rulesData: newRules };
      });
    } else if (name === "products") {
      const newRules = [...data.rulesData];
      newRules[1].permit = value === "No Permission" ? null : value;
      setData((item) => {
        return { ...item, rulesData: newRules };
      });
    } else {
      setData((prevState) => {
        return {
          ...prevState,
          [name]: value,
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
  const submitData = async (e) => {
    e.preventDefault();
    console.log("caall");

    if (
      data.fname === "" ||
      data.lname === "" ||
      data.email === "" ||
      data.mobile === ""
    ) {
      toast.warning("All fields are required!");
    } else if (data.mobile.length !== 10) {
      toast.warning("Enter Valid Mobile");
    } else if (!isValidEmail(data.email)) {
      toast.warning("Enter Valid Email");
    } else {
      await axios
        .put(`http://localhost:5555/user/edit/${productUpdateKey}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        })
        .then((res) => {
          toast.success("Product added successfully");
        })
        .catch((e) => {
          toast.error(e);
        });

      getUserData();

      setOpenDrawer(false);
    }
  };

  return (
    <>
      <Container>
        <form onSubmit={submitData}>
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
                  placeholder="DDD"
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
                  value={data?.lname}
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
                  value={data?.mobile}
                  name="mobile"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Users Permission</Form.Label>{" "}
                <Form.Select
                  onChange={handleChange}
                  className="fcontrol"
                  value={data?.rulesData[0]?.permit}
                  name="users"
                >
                  <option value={null}>No Permission</option>
                  <option value={false}>Read</option>
                  <option value={true}>Write</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                {data?.rulesData?.permit}
                <Form.Label>Products Permission</Form.Label>{" "}
                <Form.Select
                  onChange={handleChange}
                  className="fcontrol"
                  value={data?.rulesData[1]?.permit}
                  name="products"
                >
                  <option value={null} >No Permission</option>
                  <option value={false} >Read</option>
                  <option value={true} >Write</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" className="nav-btn">Submit</Button>
        </form>
      </Container>
    </>
  );
};

export default UpdateUser;
