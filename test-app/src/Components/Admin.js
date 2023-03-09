import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import left from "../Images/left.png";
import right from "../Images/right.png";
import appContext from "../Context/context";
import UpdateModal from "./Form/UpdateModal";
import { confirmAlert } from "react-confirm-alert";
import { axiosInstance } from "../services/api";
import { toast } from "react-toastify";
import Loader from "./Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  Pagination,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import SideBar from "./SideBar";
import axios from "axios";

const Admin = () => {
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
  } = useContext(appContext);
  const [updateKey, setUpdateKey] = useState("");
  const [filterText, setFilterText] = useState("");
  const [size, setSize] = useState(4);
  const adminField = JSON.parse(localStorage.getItem("userData"));
  const [page, setPage] = useState(0);

  const config = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${adminField?.token}`,
  };

  const deleteData = async (id) => {
    await axios
      .delete(`http://localhost:5555/customer/delete/${id}`, {
        headers: config,
      })
      .then((res) => {
        toast.success(res.data.sucess);
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });

    getCustomerData();
  };

  const updateData = (key) => {
    // console.log(key);
    setUpdateKey(key);
    setUpdateShow(true);
  };

  const onFilterTextChange = (query) => {
    setFilterText(query);
  };

  // const debounce = (fn) => {
  //   let timerId;
  //   return function (...args) {
  //     console.log(args);
  //     const context = this;
  //     if (timerId) clearInterval(timerId);

  //     timerId = setTimeout(() => {
  //       fn.apply(context, args);
  //     }, 2000);
  //   };
  // };

  useEffect(() => {
    getCustomerData(page, size);
  }, [page, size]);

  useEffect(() => {
    let timerId = setTimeout(() => {
      getCustomerData(page, size, filterText);
    }, 700);

    return () => {
      clearInterval(timerId);
    };
  }, [filterText]);

  const pageNum = () => {
    const rows = [];
    for (let i = 0; i < Math.ceil(totalPage); i++) {
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
            <Button
              className="nav-btn "
              onClick={() => {
                setRegisterShow(true);
              }}
            >
              Add customer
            </Button>
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
            {/* <button
              disabled={page === 0}
              onClick={() => {
                setPage(page - 1);
              }}
            >
              <img src={left} height="30" width="30" alt="icon" />
            </button> */}

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
            {/* <button
              onClick={() => {
                setPage(page + 1);
              }}
              disabled={page === totalPage - 1}
            >
              <img src={right} height="30" width="30" alt="icon" />
            </button> */}
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
                  <th>Add1</th>
                  <th>Add2</th>
                  <th>Pincode</th>
                  <th>Delete</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {userData?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.fname}</td>
                    <td>{item.lname}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    <td>{item.add1}</td>
                    <td>{item.add2}</td>
                    <td>{item.pincode}</td>
                    <td>
                      <IconButton
                        style={{ backgroundColor: "white" }}
                        disabled={
                          item.email === "admin@gmail.com" ? true : false
                        }
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
                  </tr>
                ))}
              </tbody>
              {updateShow && <UpdateModal updateKey={updateKey} />}
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

export default Admin;
