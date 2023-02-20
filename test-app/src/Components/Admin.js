import React, { useContext, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import icon from "../Images/delete.png";
import appContext from "../Context/context";
import UpdateModal from "./Modal/UpdateModal";
import { confirmAlert } from "react-confirm-alert";

const Admin = () => {
  const {
    userData,
    setUserData,
    setUpdateShow,
    updateShow,
    setDataInLocalStorage,
  } = useContext(appContext);
  const [updateKey, setUpdateKey] = useState("");

  const deleteData = (index) => {
    const filterData = userData.filter((item, i) => i !== index);
    localStorage.setItem("data", JSON.stringify(filterData));
    setDataInLocalStorage(filterData);
  };

  const updateData = (index) => {
    setUpdateKey(index);
    setUpdateShow(true);
  };

  // console.log(userData);
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
                                    deleteData(index);
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
                      updateData(index);
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
