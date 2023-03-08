import React from "react";

import { Button, Drawer } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Person4Icon from "@mui/icons-material/Person4";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { Col, Container, Row } from "react-bootstrap";
import appContext from "../Context/context";
import { useNavigate } from "react-router-dom";

const SideDrawer = ({ children }) => {
  const { openDrawer, setOpenDrawer, setProductUpdateKey } =
    React.useContext(appContext);
  const nav = useNavigate();

  const toggleDrawer = (open) => (event) => {
    setProductUpdateKey(null);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  return (
    <Drawer
      open={openDrawer}
      onClose={
        toggleDrawer(false)}
      anchor={"right"}
      style={{ width: "50%" }}
    >
      <Container className="mt-5">
        <Row>
          <Col>{children}</Col>
        </Row>
        
      </Container>
    </Drawer>
  );
};

export default SideDrawer;
