import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import appContext from "../../Context/context";
import { axiosInstance } from "../../services/api";

const LoginModal = () => {
  const { loginShow, setLoginShow, setIsAdmin } = useContext(appContext);

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

  const submitData = async () => {
    if (!data.password && !data.email) {
      toast.warning("All Field are Required");
    } else if (!isValidEmail(data.email)) {
      toast.warning("Enter Valid Email");
    } else {
      const result = await axiosInstance
        .post("/login", data)
        .then()
        .catch((e) => {
          toast.error(e.message);
        });
      setLoginShow(false);

      if (result.data.isAdmin) {
        toast.success("Admin Logged In Successfully");
        localStorage.setItem("userData", JSON.stringify(result.data));
        setIsAdmin(true);
        nav("/admin");
      } else {
        toast.success("User Logged In Successfully");
        localStorage.setItem("userData", JSON.stringify(result.data));

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
