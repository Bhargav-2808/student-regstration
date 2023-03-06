import React from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";

const CommonModal = ({ show, setShow, submitData, headerTital, children }) => {
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
    >
      <Modal.Header style={{ justifyContent: "center" }}>
        <Modal.Title>{headerTital}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#becce9" }}>
        <Button className="nav-btn" onClick={submitData}>
          {headerTital}
        </Button>
        <Button
          className="cancel-btn"
          onClick={() => {
            setShow(false);
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommonModal;
