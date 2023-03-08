import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

const UserForm = () => {
  const intialState = {
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    rulesData: [],
  };

  const [check, setCheck] = useState({});

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
    } else {
      setData((prevState) => {
        return {
          ...prevState,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  console.log(data);

  return (
    <>
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
            <Col lg={6}>
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
          </Row>

          <Row>
            <Col>
              <Form.Check
                name="box"
                type="checkbox"
                label="Read User"
                value="users"
              />
              <Form.Check
                name="box"
                type="checkbox"
                label="Write User"
                value="users"
              />
              <Form.Check
                name="box"
                type="checkbox"
                label="Read product"
                value="products"
              />
              <Form.Check
                name="box"
                type="checkbox"
                label="Write product"
                value="products"
              />
            </Col>
          </Row>
        </form>
      </Container>
    </>
  );
};

export default UserForm;
