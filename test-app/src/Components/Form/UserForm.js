import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import appContext from "../../Context/context";

const UserForm = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  const { setOpenDrawer, getUserData } = React.useContext(appContext);

  const initialState = {
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    rulesData: [
      {
        rule: "users",
        permit: null,
      },
      {
        rule: "products",
        permit: null,
      },
    ],
    password: "",
  };

  const [data, setData] = useState(initialState);
  // const [permit, setPermit] = useState({
  //   products: {
  //     read: false,
  //     write: false,
  //   },
  //   users: {
  //     read: false,
  //     write: false,
  //   },
  // });

  const handleChange = (e) => {
    let value =
      e.target.name === "email" ? e.target.value.toLowerCase() : e.target.value;

    const name = e.target.name;

    if (name === "mobile") {
      if (value.length <= 10) {
        setData((prevState) => {
          return {
            ...prevState,
            [name]: e.target.value,
          };
        });
      }
    } else if (name === "users") {
      const newRules = [...data.rulesData];

      newRules[0].permit = value === "No Permission" ? null : value;

      setData((item) => {
        return { ...item, rulesData: newRules };
      });
    } else if (name === "products") {
      const newRules = [...data.rulesData];
      newRules[1].permit = value === "No Permission" ? null : value;
      setData((item) => {
        return { ...item, rulesData: newRules };
      });
    } else {
      setData((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    }
  };

  // else if (type === "checkbox") {
  // const obj = {
  //   rule: key,
  //   permit: e.target.value,
  // };

  // if (checked) {
  //   if (value === "true") {
  //     setPermit((per) => {
  //       return {
  //         ...per,
  //         [key]: { read: true, write: true },
  //       };
  //     });

  //     const index = initialState.rulesData.findIndex(
  //       (item) => item.rule === key
  //     );
  //     const newState = [...initialState.rulesData];
  //     newState[index].permit = true;
  //     setData((per) => {
  //       return {
  //         ...per,
  //         rulesData: newState,
  //       };
  //     });
  //   } else {
  //     setPermit((per) => {
  //       return {
  //         ...per,
  //         [key]: { read: true, write: false },
  //       };
  //     });

  //     const index = initialState.rulesData.findIndex(
  //       (item) => item.rule === key
  //     );
  //     const newState = [...initialState.rulesData];
  //     newState[index].permit = false;
  //     setData((per) => {
  //       return {
  //         ...per,
  //         rulesData: newState,
  //       };
  //     });
  //   }
  // } else {
  //   setPermit((per) => {
  //     return {
  //       ...per,
  //       [key]: {
  //         read: false,
  //         write: false,
  //       },
  //     };
  //   });

  //   const index = initialState.rulesData.findIndex(
  //     (item) => item.rule === key
  //   );
  //   const newState = [...initialState.rulesData];
  //   newState[index].permit = false;
  //   setData((per) => {
  //     return {
  //       ...per,
  //       rulesData: newState,
  //     };
  //   });
  // }
  const isValidEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      return true;
    }
  };

  const isValidPwd = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w!@#$%^&*?~()-]{8,}$/;
    if (re.test(password)) {
      return true;
    }
  };
  const submitData = async (e) => {
    e.preventDefault();

    if (
      data.fname === "" ||
      data.lname === "" ||
      data.email === "" ||
      data.mobile === ""
    ) {
      toast.warning("All fields are required!");
    } else if (data.mobile.length !== 10) {
      toast.warning("Enter Valid Mobile");
    } else if (!isValidEmail(data.email)) {
      toast.warning("Enter Valid Email");
    } else if (!isValidPwd(data.password)) {
      toast.warning("Password should be in Valid Formate..");
    } else {
      await axios
        .post(`http://localhost:5555/user/register`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        })
        .then((res) => {
          toast.success("Product added successfully");
        })
        .catch((e) => {
          // console.log(e.response.data.error);
          toast.error(e);
        });

      getUserData();

      setOpenDrawer(false);
    }
  };

  // const handleOnChange = (value, i, field) => {
  //   console.log(value, i, field);
  // };
  return (
    <>
      <Container>
        <form onSubmit={submitData} action="/" method="post">
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>{" "}
                <Form.Control
                  type="text"
                  className="fcontrol"
                  name="fname"
                  onChange={handleChange}
                  value={data.fname}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>{" "}
                <Form.Control
                  className="fcontrol"
                  type="text"
                  name="lname"
                  onChange={handleChange}
                  value={data.lname}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>{" "}
                <Form.Control
                  type="email"
                  onChange={handleChange}
                  value={data.email}
                  className="fcontrol"
                  name="email"
                  placeholder="xyz@gmail.com"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                {" "}
                <Form.Label>Mobile Number</Form.Label>{" "}
                <Form.Control
                  type="number"
                  className="fcontrol"
                  value={data.mobile}
                  name="mobile"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <Form.Group className="mb-3">
                {" "}
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  className="fcontrol"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Users Permission</Form.Label>{" "}
                <Form.Select
                  onChange={handleChange}
                  className="fcontrol"
                  value={data?.rulesData?.permit}
                  name="users"
                >
                  <option value={null} selected>
                    No Permission
                  </option>
                  <option value={false}>Read</option>
                  <option value={true}>Write</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Products Permission</Form.Label>{" "}
                <Form.Select
                  onChange={handleChange}
                  className="fcontrol"
                  value={data?.rulesData?.permit}
                  name="products"
                >
                  <option value={null} selected>
                    No Permission
                  </option>
                  <option value={false}>Read</option>
                  <option value={true}>Write</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* <Row>
            <Col>
              {data?.rulesData?.map((item, i) => (
                <>
                  <div key={i}>
                    <Form.Label>{item?.rule}</Form.Label>
                    <Form.Check
                      name={item.rule}
                      type="checkbox"
                      label={"Read"}
                      value={false}
                      onChange={handleChange}
                      checked={permit[item.rule].read}
                    />
                    <Form.Check
                      name={item.rule}
                      type="checkbox"
                      label={"Write"}
                      value={true}
                      onChange={handleChange}
                      checked={permit[item.rule].write}
                    />
                  </div>
                </>
              ))}
            </Col>
          </Row> */}
          <Button type="submit" className="nav-btn">Submit</Button>
        </form>
      </Container>
    </>
  );
};

export default UserForm;
