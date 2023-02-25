import React, { useContext, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";

import appContext from "../Context/context";
import UpdateModal from "./Modal/UpdateModal";
import { confirmAlert } from "react-confirm-alert";
import { axiosInstance } from "../services/api";
import { toast } from "react-toastify";

const Admin = () => {
  const {
    userData,
    setUpdateShow,
    updateShow,

    getUserData,
  } = useContext(appContext);
  const [updateKey, setUpdateKey] = useState("");

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
    setUpdateKey(key);
    setUpdateShow(true);
  };



  return (
    <>
      <Container fluid>
        <div className="d-flex justify-content-center mt-3">
          <h3>User Data </h3>
        </div>
        <Table
          striped
          bordered
          hover
          // style={{ backgroundColor: "#1d2345", color: "white" }}
          className="mt-2"
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
                  <Button
                    className="nav-btn"
                    disabled={item.email === "admin@gmail.com" ? true : false}
                    onClick={() => {
                      confirmAlert({
                        customUI: ({ onClose }) => {
                          return (
                            <>
                              <div className="confirm-box">
                                <h1>Are you sure?</h1>
                                <p>You want to delete this Data?</p>
                                <Button className="nav-btn" onClick={onClose}>
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
                    Delete
                  </Button>
                </td>
                <td>
                  <Button
                    className="nav-btn"
                    disabled={item.email === "admin@gmail.com" ? true : false}
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
      </Container>
    </>
  );
};

export default Admin;
