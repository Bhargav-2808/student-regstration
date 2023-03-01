import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import left from "../Images/left.png";
import right from "../Images/right.png";
import appContext from "../Context/context";
import UpdateModal from "./Modal/UpdateModal";
import { confirmAlert } from "react-confirm-alert";
import { axiosInstance } from "../services/api";
import { toast } from "react-toastify";
import Loader from "./Loader";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";

const Admin = () => {
  const {
    userData,
    setUpdateShow,
    updateShow,
    loading,
    getUserData,
    count,
    totalPage,
  } = useContext(appContext);
  const [updateKey, setUpdateKey] = useState("");
  const [filterText, setFilterText] = useState("");
  const [size, setSize] = useState(4);
  // const [] = useState({});
  const [page, setPage] = useState(0);

  const deleteData = async (id) => {
    await axiosInstance
      .delete(`/delete/${id}`)
      .then((res) => {
        toast.success(res.data.sucess);
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });

    getUserData();
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
  return (
    <>
      <Container fluid>
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
          {/* <Col
            style={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
              marginTop:"5px"
            }}
          >
            <h5 style={{ color: "#1d2345" }}>Total Page: {totalPage}</h5>
            <h5 style={{ color: "#1d2345" }}>Total Entry: {count}</h5>
          </Col> */}
        </Row>

        <Row>
          <Col className="d-flex justify-content-between mt-4">
            <button
              disabled={page === 0}
              onClick={() => {
                setPage(page - 1);
              }}
            >
              <img src={left} height="30" width="30" alt="icon" />
            </button>

            <div className="d-flex me-5 align-items-center">
              <h3 className="me-3">Rows Per Page</h3>
              <form>
                <select
                  onChange={(e) => {
                    setSize(parseInt(e.target.value));
                  }}
                  style={{ fontSize: "20px", border: "2px solid black" }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option selected>4</option>
                  <option>5</option>
                </select>
              </form>
            </div>
            <h3 style={{ color: "#1d2345" }}>Total Page: {totalPage}</h3>
            <h3 style={{ color: "#1d2345" }}>Total Entry: {count}</h3>
            <button
              onClick={() => {
                setPage(page + 1);
              }}
              disabled={page === totalPage - 1}
            >
              <img src={right} height="30" width="30" alt="icon" />
            </button>
          </Col>
        </Row>
        {!loading ? (
          <>
            {" "}
            {/* <Table
              striped
              bordered
              hover
              // style={{ backgroundColor: "#1d2345", color: "white" }}
              className="mt-4"
              variant="dark"
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
                        style={{backgroundColor:"white"}}
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
                        <DeleteIcon fontSize="2.5rem"/>
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
            </Table> */}


            
          </>
        ) : (
          <Loader />
        )}
      </Container>
    </>
  );
};

export default Admin;
