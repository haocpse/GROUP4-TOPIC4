// src/components/PackageConstruction.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Card,
} from "react-bootstrap";

const PackageConstruction = () => {
  const [constructions, setConstructions] = useState([]);
  const [packagePrices, setPackagePrices] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [priceError, setPriceError] = useState({}); // Lưu lỗi cho từng giá trị price

  const fetchPackagePrices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/packageConstruction"
      );
      setPackagePrices(response.data.data || []);
    } catch (error) {
      console.error("Error fetching package prices:", error);
    }
  };

  useEffect(() => {
    fetchPackagePrices();
  }, []);

  const handlePackageChange = (event) => {
    const selectedPackageId = event.target.value;
    setSelectedPackage(selectedPackageId);

    const selectedPackageData = packagePrices.find(
      (pkg) => pkg.packageId === selectedPackageId
    );
    if (
      selectedPackageData &&
      selectedPackageData.constructionInfoResponseList
    ) {
      setConstructions(
        selectedPackageData.constructionInfoResponseList.map(
          (construction) => ({
            content: construction.content,
            price: "",
          })
        )
      );
    } else {
      setConstructions([]);
    }
  };

  const handleConstructionChange = (index, field, value) => {
    const newConstructions = [...constructions];
    const newPriceError = { ...priceError };

    if (field === "price") {
      let numericValue = value.replace(/\D/g, ""); // Loại bỏ các ký tự không phải số

      // Kiểm tra nếu nhỏ hơn 50.000 hoặc lớn hơn 500.000 và cập nhật cảnh báo
      if (numericValue && parseInt(numericValue) < 50000) {
        newPriceError[index] = "minimum 50.000";
      } else if (numericValue && parseInt(numericValue) > 500000) {
        newPriceError[index] = "max 500.000";
      } else {
        delete newPriceError[index]; // Xóa lỗi nếu giá trị hợp lệ
      }

      newConstructions[index][field] = numericValue
        ? parseInt(numericValue).toLocaleString("de-DE")
        : ""; // Định dạng với dấu chấm
    } else {
      newConstructions[index][field] = value;
    }

    setConstructions(newConstructions);
    setPriceError(newPriceError); // Cập nhật lỗi hiển thị
  };

  const handleAddConstruction = () => {
    setConstructions([
      ...constructions,
      {
        content: "",
        price: "",
      },
    ]);
  };

  const handleSubmit = async () => {
    try {
      const requestBody = {
        packageId: selectedPackage,
        packageConstructions: constructions.map((construction) => ({
          content: construction.content,
          // Bỏ dấu chấm trước khi gửi lên server
          price: parseInt(construction.price.replace(/\./g, "")),
        })),
      };

      await axios.put(
        `http://localhost:8080/packageConstruction/${selectedPackage}`,
        requestBody
      );
      fetchPackagePrices();
      setSelectedPackage("");
      setConstructions([]);
      setPriceError({});
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error saving construction content:", error);
    }
  };

  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={8} className="mx-auto">
          <div className="text-center mb-4">
            <h5 className="text-white bg-danger p-3 rounded">
              Package Construction
            </h5>
          </div>

          <div className="d-flex justify-content-center mb-4">
            <Form.Label className="text-muted me-2">Select Package:</Form.Label>
            <Form.Select
              aria-label="Select package"
              className="w-50 rounded"
              value={selectedPackage}
              onChange={handlePackageChange}
            >
              <option>Select package</option>
              {packagePrices.map((packagePrice, index) => (
                <option key={index} value={packagePrice.packageId}>
                  {packagePrice.packageType}
                </option>
              ))}
            </Form.Select>
          </div>

          {constructions.map((construction, index) => (
            <Card key={index} className="mb-4 shadow border-0">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={8}>
                    <Form.Group controlId={`content-${index}`}>
                      <Form.Label className="fw-bold text-muted">
                        Content:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={construction.content}
                        onChange={(e) =>
                          handleConstructionChange(
                            index,
                            "content",
                            e.target.value
                          )
                        }
                        placeholder="Enter content"
                        className="rounded"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group
                      controlId={`price-${index}`}
                      className="mt-3 mt-md-0"
                    >
                      <Form.Label className="fw-bold text-muted">
                        Price:
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          value={construction.price}
                          onChange={(e) =>
                            handleConstructionChange(
                              index,
                              "price",
                              e.target.value
                            )
                          }
                          placeholder="Enter price"
                          className="rounded"
                        />
                        <InputGroup.Text>VND</InputGroup.Text>
                      </InputGroup>
                      {priceError[index] && (
                        <Form.Text className="text-danger">
                          {priceError[index]}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}

          <div className="d-flex justify-content-between mt-4">
            <Button
              variant="primary"
              onClick={handleAddConstruction}
              className="rounded"
            >
              Add More Content
            </Button>
            <Button
              variant="success"
              onClick={handleSubmit}
              className="rounded"
            >
              Submit
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PackageConstruction;
