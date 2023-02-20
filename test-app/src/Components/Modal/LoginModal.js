import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import appContext from "../../Context/context";

const LoginModal = () => {
  const { loginShow, setLoginShow, userData, setIsAdmin } =
    useContext(appContext);

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

  const submitData = () => {
    if (!data.password && !data.email) {
      toast.warning("All Field are Required");
    }
    if (!isValidEmail(data.email)) {
      toast.warning("Enter Valid Email");
    } else if (
      userData.find((e) => e.email === data.email) &&
      userData.find((e) => e.password === data.password) &&
      data.email === "admin@gmail.com" &&
      data.password === "admin"
    ) {
      toast.success("Admin Logged In Successfully");
      const logData = userData.find((e) => e.email === data.email);
      setIsAdmin("admin");

      localStorage.setItem("userData", JSON.stringify(logData));
      localStorage.setItem("user", "admin");
      nav("/admin");
      setLoginShow(false);
    } else if (
      userData.find((e) => e.email === data.email) &&
      userData.find((e) => e.password === data.password)
    ) {
      toast.success("User Logged In Successfully");

      const logData = userData.find((e) => e.email === data.email);
      setIsAdmin("notAdmin");
      localStorage.setItem("userData", JSON.stringify(logData));
      localStorage.setItem("user", "notAdmin");
      nav("/welcome");
      setLoginShow(false);
    } else {
      toast.error("Invalid credentials! ");
    }
  };

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      return true;
    }
  };
  // console.log(userData);

  return (
    <>
      <Modal
        show={loginShow}
        onHide={() => {
          setLoginShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
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
        </Modal.Body>
        <Modal.Footer>
          <Button className="nav-btn" onClick={submitData}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;
