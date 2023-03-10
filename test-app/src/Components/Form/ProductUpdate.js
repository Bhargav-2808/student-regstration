import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import appContext from "../../Context/context";

const ProductUpdate = ({ updateKey }) => {
  const user = JSON.parse(localStorage.getItem("userData"));

  const {
    setOpenDrawer,
    getProductData,
    productData,
    productUpdateKey,
    setProductUpdateKey,
  } = useContext(appContext);
  const filterData = productData.filter(
    (item) => item.id === parseInt(productUpdateKey)
  )[0];

  const [data, setData] = useState(filterData);
    
  

  const config = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user?.token}`,
  };
  const initialVariantState = {
    variantImage: "",
    option: "",
    optionValue: "",
    quantity: 1,
    sku: Date.now().toString(36) + Math.random().toString(36).substr(2),
  };
  const intialState = {
    productName: "",
    description: "",
    category: "Electonics",
    variants: [],
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((product) => {
      return {
        ...product,
        [name]: value,
      };
    });
  };
  const handleVariantChange = (index, field, value) => {
    const newVariants = [...data.variants];
    newVariants[index][field] = value;
    setData((product) => {
      return { ...product, variants: newVariants };
    });
  };

  const handleAddVariant = () => {
    setData((product) => {
      return {
        ...product,
        variants: [...product.variants, initialVariantState],
      };
    });
    getProductData();
  };

  const handleDeleteVariant = (index) => {
    const newVariants = [...data.variants];
    newVariants.splice(index, 1);
    setData((product) => {
      return {
        ...product,
        variants: newVariants,
      };
    });
    getProductData();
  };

  // console.log(data);
  const handleSubmit = async (event) => {
    console.log(data, "update");
    event.preventDefault();
    if (
      data.productName === "" ||
      data.category === "" ||
      data.variants.option === "" ||
      data.variants.optionValue === "" ||
      data.variants.quantity === "" ||
      data.variants.sku === ""
    ) {
      toast.warning("All fields are required!");
    } else if (data.variants.quantity < 1) {
      toast.warning("Minimam quantity is 1");
    } else {
      console.log(data, "api");
      await axios
        .put(`http://localhost:5555/product/edit/${productUpdateKey}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        })
        .then((res) => {
          toast.success("Product Updated successfully");
        })
        .catch((e) => {
          // console.log(e.response.data.error);
          toast.error(e);
        });
      getProductData();
      setOpenDrawer(false);
      setProductUpdateKey(null);
    }
  };
  const handleFile = async (event, index) => {
    console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append("pic", event.target.files[0]);
    console.log(formData.get("pic"));
    const res = await axios.post(
      "http://localhost:5555/customer/imageupload",
      formData
    );

    const newVariants = [...data.variants];
    newVariants[index]["variantImage"] = res.data.file ?? null;
    setData((product) => {
      return { ...product, variants: newVariants };
    });
  };

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>{" "}
                <Form.Control
                  type="text"
                  className="fcontrol"
                  name="productName"
                  onChange={handleChange}
                  value={data.productName}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>{" "}
                <Form.Select
                  onChange={handleChange}
                  className="fcontrol"
                  value={data.category}
                  name="category"
                >
                  <option selected>Electonics</option>
                  <option>Cloths</option>
                  <option>Sports and OutDoors</option>
                  <option>Toys & games</option>
                  <option>Beauty & Personal Care</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>{" "}
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  value={data.description}
                  className="fcontrol"
                  name="description"
                />
              </Form.Group>
            </Col>
          </Row>

          {data?.variants?.map((variant, index) => (
            <Row>
              <Col>
                <div key={index}>
                  <div className="d-flex justify-content-between mt-3 mb-3">
                    <Form.Label>Variant {index + 1}</Form.Label>
                    {data.variants.length > 1 && (
                      <button
                        type="button"
                        className="nav-btn"
                        onClick={() => handleDeleteVariant(index)}
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Variant Image</Form.Label>{" "}
                        <Form.Control
                          type="file"
                          className="fcontrol"
                          name="pic"
                          onChange={(event) => {
                            handleFile(event, index);
                          }}
                        />
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Quantity</Form.Label>{" "}
                        <Form.Control
                          type="number"
                          className="fcontrol"
                          value={variant.quantity}
                          onChange={(event) =>
                            handleVariantChange(
                              index,
                              "quantity",
                              event.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Variant Option</Form.Label>{" "}
                        <Form.Control
                          type="text"
                          className="fcontrol"
                          value={variant.option}
                          onChange={(event) =>
                            handleVariantChange(
                              index,
                              "option",
                              event.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Variant Value</Form.Label>{" "}
                        <Form.Control
                          type="text"
                          className="fcontrol"
                          value={variant.optionValue}
                          onChange={(event) =>
                            handleVariantChange(
                              index,
                              "optionValue",
                              event.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          ))}
          <Row>
            <Col className="d-flex justify-content-between mt-3 mb-3">
              <Button
                type="button"
                className="nav-btn "
                onClick={handleAddVariant}
              >
                Add Variant
              </Button>
              <Button className="nav-btn" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    </>
  );
};

export default ProductUpdate;
