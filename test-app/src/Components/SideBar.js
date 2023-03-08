import * as React from "react";
import { Button, Drawer } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Person4Icon from "@mui/icons-material/Person4";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { Col, Container, Row } from "react-bootstrap";
import appContext from "../Context/context";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const {
    openSideBar,
    setOpenSideBar,
    getUserProfile,
    userProfileData,
    filterProductPermission,
    filterUserPermission,
  } = React.useContext(appContext);
  const nav = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenSideBar(open);
  };

  React.useEffect(() => {
    getUserProfile();
  }, []);

  // const filterUserPermission = userProfileData?.permissions?.filter((item) => {
  //   return item.ruleId === 1;
  // })[0];

  // const filterProductPermission = userProfileData?.permissions?.filter(
  //   (item) => {
  //     return item.ruleId === 2;
  //   }
  // )[0];
  console.log(filterProductPermission?.permission);
  return (
    <>
      <Drawer open={openSideBar} onClose={toggleDrawer(false)}>
        <Container className="mt-5">
          <Row>
            <Col>
              <div className="p-3 d-flex flex-column">
                <Button
                  className="sidebar-btn"
                  startIcon={<Person4Icon />}
                  onClick={() => {
                    setOpenSideBar(false);
                    nav("/admin");
                  }}
                >
                  Customer
                </Button>

                {(filterUserPermission?.permission === true ||
                  filterUserPermission?.permission === false) && (
                  <Button
                    className="sidebar-btn"
                    startIcon={<AdminPanelSettingsIcon />}
                    onClick={() => {
                      setOpenSideBar(false);
                      nav("/admin/user");
                    }}
                  >
                    {" "}
                    User
                  </Button>
                )}

                {(filterProductPermission?.permission === true ||
                  filterProductPermission?.permission === false) && (
                  <Button
                    className="sidebar-btn"
                    startIcon={<ProductionQuantityLimitsIcon />}
                    onClick={() => {
                      setOpenSideBar(false);
                      nav("/admin/product");
                    }}
                  >
                    Products
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </Drawer>
    </>
  );
}
