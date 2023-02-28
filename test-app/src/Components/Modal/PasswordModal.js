import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import appContext from "../../Context/context";
import { axiosInstance } from "../../services/api";

const PasswordModal = ({ id }) => {
  const { setIsAdmin, getUserData, passwordShow, setPasswordShow } =
    useContext(appContext);

  const intialState = {
    password: "",
    cPassword: "",
  };

  const [data, setData] = useState(intialState);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  console.log(id);
  const submitData = () => {
    if (!data.password && !data.cPassword) {
      toast.warning("All Field are Required");
    } else {
      axiosInstance
        .put(`/edit/${id}`, data)
        .then((res) => {
          toast.success("Password updated successfully");
        })
        .catch((e) => {
          toast.error(e.message);
        });
      setPasswordShow(false);
      getUserData();
    }
  };

  return (
    <>
      <Modal
        show={passwordShow}
        onHide={() => {
          setPasswordShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

export default PasswordModal;
