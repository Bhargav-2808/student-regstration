import { IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import appContext from "../Context/context";
import { axiosInstance } from "../services/api";
import UpdateModal from "./Form/UpdateModal";
import Loader from "./Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import SideDrawer from "./SideDrawer";
import ProductUpdate from "./Form/ProductUpdate";
import axios from "axios";
import ProductForm from "./Form/ProductForm";

const Product = () => {
  const {
    productData,
    setUpdateShow,
    updateShow,
    loading,
    getProductData,
    count,
    setRegisterShow,
    totalPage,
    setPasswordShow,
    openDrawer,
    productUpdateKey,
    setProductUpdateKey,
    filterProductPermission,

    setOpenDrawer,
  } = useContext(appContext);
  const user = JSON.parse(localStorage.getItem("userData"));

  const [updateKey, setUpdateKey] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [size, setSize] = useState(4);
  // const [] = useState({});
  const [page, setPage] = useState(0);

  const config = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user?.token}`,
  };
  const deleteData = async (id) => {
    await axios
      .delete(`http://localhost:5555/product/delete/${id}`, {
        headers: config,
      })
      .then((res) => {
        toast.success(res.data.sucess);
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });

    getProductData();
  };

  const updateData = (key) => {
    // console.log(key);
    setProductUpdateKey(key);
    setUpdateKey(key);
    // getProduct(key)
    setOpenDrawer(true);
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
    getProductData(page, size);
  }, [page, size]);

  useEffect(() => {
    let timerId = setTimeout(() => {
      getProductData(page, size, filterText);
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
                setOpenDrawer(true);
              }}
            >
              Add Product
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
                  <th>Index</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Description</th>
                  {filterProductPermission?.permisssion === true && (
                    <>
                      <th>Delete</th>
                      <th>Update</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {productData?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.productName}</td>
                    <td>{item.category}</td>
                    <td>{item.description}</td>
                    {filterProductPermission?.permisssion === true && (
                      <>
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
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
              {/* {updateShow && <UpdateModal updateKey={updateKey} />} */}
              {openDrawer && productUpdateKey !== null ? (
                <SideDrawer>
                  <ProductUpdate updateKey={updateKey} />
                </SideDrawer>
              ) : (
                <SideDrawer>
                  <ProductForm />
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

export default Product;
