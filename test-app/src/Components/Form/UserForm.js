import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const UserForm = () => {
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

    const key = e.target.name;

    if (key === "mobile") {
      if (value.length <= 10) {
        setData((prevState) => {
          return {
            ...prevState,
            [key]: e.target.value,
          };
        });
      }
    } else {
      setData((prevState) => {
        return {
          ...prevState,
          [e.target.name]: e.target.value,
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

  const submitData = (e) => {
    console.log(data);
    e.preventDefault();
  };

  const handleOnChange = (value, i, field) => {
    console.log(value, i, field);
  };
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
              
            </Col>
            <Col>
            
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
          <Button type="submit">Submit</Button>
        </form>
      </Container>
    </>
  );
};

export default UserForm;
