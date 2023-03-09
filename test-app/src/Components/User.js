import { IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import appContext from "../Context/context";
import UpdateModal from "./Form/UpdateModal";
import Loader from "./Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import SideDrawer from "./SideDrawer";
import UserForm from "./Form/UserForm";
import axios from "axios";

const User = () => {
  const {
    userData,
    setUpdateShow,
    updateShow,
    loading,
    getCustomerData,
    count,
    setRegisterShow,
    totalPage,
    setPasswordShow,
    openDrawer,
    setOpenDrawer,
    filterUserPermission,
    getUserData,
    adminData,
  } = useContext(appContext);
  const [updateKey, setUpdateKey] = useState("");
  const [filterText, setFilterText] = useState("");
  const [size, setSize] = useState(4);
  // const [] = useState({});
  const [page, setPage] = useState(0);

  const deleteData = async (id) => {
    await axios
      .delete(`http://localhost:5555/customer/delete/${id}`)
      .then((res) => {
        toast.success(res.data.sucess);
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });

    getUserData();
  };

  const updateData = (key) => {
    setUpdateKey(key);
    setUpdateShow(true);
  };

  const onFilterTextChange = (query) => {
    setFilterText(query);
  };

  useEffect(() => {
    getUserData(page, size);
  }, [page, size]);

  useEffect(() => {
    let timerId = setTimeout(() => {
      getUserData(page, size, filterText);
    }, 700);

    return () => {
      clearInterval(timerId);
    };
  }, [filterText]);

  const pageNum = () => {
    const rows = [];
    for (let i = 0; i < totalPage; i++) {
      rows.push(
        <Button
          key={i}
          variant={i == page ? "dark" : ""}
          onClick={() => {
            setPage(i);
          }}
        >
          {" "}
          {i + 1}{" "}
        </Button>
      );
    }
    return rows;
  };
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <input
              type="text"
              value={filterText}
              placeholder="Search..."
              onChange={(e) => {
                onFilterTextChange(e.target.value);
              }}
              className="search"
            />
          </Col>
          <Col className="d-flex justify-content-end me-4 mt-3">
            {filterUserPermission?.permission === true && (
              <Button
                className="nav-btn "
                onClick={() => {
                  setOpenDrawer(true);
                }}
              >
                Add User
              </Button>
            )}

            <Button
              className="nav-btn ms-2"
              onClick={() => {
                setPasswordShow(true);
              }}
            >
              Update Password
            </Button>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-between mt-4">
            <div className="d-flex me-5 align-items-center">
              <h5 className="me-3">Rows Per Page</h5>
              <form>
                <select
                  onChange={(e) => {
                    setSize(parseInt(e.target.value));
                  }}
                  style={{ fontSize: "16px", border: "2px solid black" }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option selected>4</option>
                  <option>5</option>
                </select>
              </form>
            </div>
            <h5 style={{ color: "#1d2345" }}>Total Page: {totalPage}</h5>
            <h5 style={{ color: "#1d2345" }}>Total Entry: {count}</h5>
          </Col>
        </Row>
        {!loading ? (
          <>
            {" "}
            <Table
              className="customer-table mt-4"
              bordered
              hover
              // style={{ backgroundColor: "#1d2345", color: "white" }}
            >
              <thead>
                <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  {filterUserPermission?.permission === true && (
                    <>
                      {" "}
                      <th>Delete</th>
                      <th>Update</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {adminData?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.fname}</td>
                    <td>{item.lname}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    {filterUserPermission?.permission === true && (
                      <>
                        <td>
                          <IconButton
                            style={{ backgroundColor: "white" }}
                            onClick={() => {
                              confirmAlert({
                                customUI: ({ onClose }) => {
                                  return (
                                    <>
                                      <div className="confirm-box">
                                        <h1>Are you sure?</h1>
                                        <p>You want to delete this Data?</p>
                                        <Button
                                          className="cancel-btn me-2"
                                          onClick={onClose}
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          className="nav-btn"
                                          onClick={() => {
                                            deleteData(item.id);
                                            onClose();
                                          }}
                                        >
                                          Delete
                                        </Button>
                                      </div>
                                    </>
                                  );
                                },
                              });
                            }}
                          >
                            <DeleteIcon fontSize="2.5rem" />
                          </IconButton>
                        </td>
                        <td>
                          <Button
                            className="nav-btn"
                            disabled={
                              item.email === "admin@gmail.com" ? true : false
                            }
                            onClick={() => {
                              updateData(item.id);
                            }}
                          >
                            Update
                          </Button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
              {/* {updateShow && <UpdateModal updateKey={updateKey} />} */}
              {openDrawer && (
                <SideDrawer>
                  <UserForm />
                </SideDrawer>
              )}
            </Table>
          </>
        ) : (
          <Loader />
        )}
        <div className="d-flex justify-content-center">{pageNum()}</div>
      </Container>
    </>
  );
};

export default User;
