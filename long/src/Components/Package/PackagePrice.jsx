// src/components/PackagePrice.js
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const PackagePrice = () => {
  const [packages, setPackages] = useState([
    { minVolume: 0, maxVolume: 10 },
    { minVolume: 11, maxVolume: 20 },
    { minVolume: 21, maxVolume: 50 },
    { minVolume: 51, maxVolume: 100 },
    { minVolume: 101, maxVolume: 3000 },
  ]);

  const [selectedPackageType, setSelectedPackageType] = useState("");

  const handlePackageChange = (index, field, value) => {
    const newPackages = [...packages];
    newPackages[index][field] = value;
    setPackages(newPackages);
  };

  const handleAddPackage = () => {
    setPackages([...packages, { minVolume: "", maxVolume: "" }]);
  };

  const handleRemovePackage = (index) => {
    const newPackages = packages.filter((_, i) => i !== index);
    setPackages(newPackages);
  };

  const handlePriceGenerate = (index) => {
    const minVolume = parseFloat(packages[index].minVolume);
    const maxVolume = parseFloat(packages[index].maxVolume);

    // Validation check
    if (
      isNaN(minVolume) ||
      isNaN(maxVolume) ||
      minVolume < 0 ||
      maxVolume < 0 ||
      minVolume >= maxVolume
    ) {
      alert(
        "Invalid volume range. Please ensure that Min Volume is less than Max Volume and both are positive."
      );
      return;
    }

    const generatedPrice = (minVolume + maxVolume) * 10; // Example pricing logic
    alert(`Generated Price: ${generatedPrice.toFixed(2)}`);
  };

  const handleSubmit = () => {
    console.log("Submitted Packages:", packages);
    alert("Packages submitted successfully!");
  };

  return (
    <Container fluid>
      <Row>
        <Col md={12} className="p-3">
          <h5 className="text-muted">Package Price</h5>

          {/* Select Package Type */}
          <Form.Group className="mb-3">
            <Form.Label>Select Package Type:</Form.Label>
            <Form.Select
              value={selectedPackageType}
              onChange={(e) => setSelectedPackageType(e.target.value)}
            >
              <option value="">Choose a package type</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="deluxe">Deluxe</option>
            </Form.Select>
          </Form.Group>

          <Button variant="success" onClick={handleAddPackage} className="mb-3">
            New Package
          </Button>

          <Row className="g-4">
            {packages.map((pkg, index) => (
              <Col md={6} key={index}>
                <div className="p-3 bg-light border">
                  <Form.Group className="mb-3">
                    <Form.Label>Min Volume:</Form.Label>
                    <Form.Control
                      type="number"
                      value={pkg.minVolume}
                      onChange={(e) =>
                        handlePackageChange(index, "minVolume", e.target.value)
                      }
                      placeholder="Min Volume"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Max Volume:</Form.Label>
                    <Form.Control
                      type="number"
                      value={pkg.maxVolume}
                      onChange={(e) =>
                        handlePackageChange(index, "maxVolume", e.target.value)
                      }
                      placeholder="Max Volume"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    onClick={() => handlePriceGenerate(index)}
                    className="mt-2"
                  >
                    New Price
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleRemovePackage(index)}
                    className="mt-2 ms-2"
                  >
                    Remove Package
                  </Button>
                </div>
              </Col>
            ))}
          </Row>

          <Button variant="success" onClick={handleSubmit} className="mt-4">
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PackagePrice;
