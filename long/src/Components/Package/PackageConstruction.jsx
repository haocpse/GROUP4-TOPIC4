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
    newConstructions[index][field] = value;
    setConstructions(newConstructions);
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
          price: construction.price,
        })),
      };

      await axios.put(
        `http://localhost:8080/packageConstruction/${selectedPackage}`,
        requestBody
      );
      fetchPackagePrices();
      setSelectedPackage("");
      setConstructions([]);
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
                          type="number"
                          value={construction.price}
                          onChange={(e) => {
                            let value = e.target.value;
                            if (value < 50000) value = 50000;
                            if (value > 500000) value = 500000;
                            handleConstructionChange(index, "price", value);
                          }}
                          placeholder="Enter price"
                          min="50000"
                          max="500000"
                          className="rounded"
                        />
                        <InputGroup.Text>VND</InputGroup.Text>
                      </InputGroup>
                      <Form.Text className="text-muted">
                        Must be between 50,000 and 500,000 VND.
                      </Form.Text>
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
