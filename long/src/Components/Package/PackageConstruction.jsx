import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const PackageConstruction = () => {
  const [constructions, setConstructions] = useState([
    { constructionName: "Construction 1", content: "Content" },
  ]);

  const handleConstructionChange = (index, field, value) => {
    const newConstructions = [...constructions];
    newConstructions[index][field] = value;
    setConstructions(newConstructions);
  };

  const handleAddConstruction = () => {
    setConstructions([
      ...constructions,
      {
        constructionName: `Construction ${constructions.length + 1}`,
        content: "",
      },
    ]);
  };

  const handleSubmit = () => {
    console.log("Submitted Constructions:", constructions);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={12} className="p-3">
          <h5 className="text-muted">Package Construction</h5>

          <div className="d-flex align-items-center mb-4">
            <Form.Label className="text-muted me-2">Package Type:</Form.Label>
            <Form.Select aria-label="Select package" className="me-2">
              <option>Select package</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="enterprise">Enterprise</option>
            </Form.Select>
          </div>

          {constructions.map((construction, index) => (
            <div key={index} className="mb-3">
              <Form.Group>
                <Form.Label>{construction.constructionName}:</Form.Label>
                <Form.Control
                  type="text"
                  value={construction.content}
                  onChange={(e) =>
                    handleConstructionChange(index, "content", e.target.value)
                  }
                  placeholder="Content"
                />
              </Form.Group>
            </div>
          ))}

          <Button
            variant="secondary"
            onClick={handleAddConstruction}
            className="mt-3"
          >
            Add More Content
          </Button>

          <Button
            variant="success"
            onClick={handleSubmit}
            className="mt-4 ms-3"
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PackageConstruction;
