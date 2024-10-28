import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const PackageManage = () => {
  const navigate = useNavigate();
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-light p-3">
          <h5>Create Package</h5>
          <Button
            variant="primary"
            className="mb-2"
            onClick={() => navigate("/package/package-price")}
          >
            Package Price
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/package/package-construction")} // Navigate to Package Construction
          >
            Package Construction
          </Button>
        </Col>
        <Col md={10} className="p-3">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default PackageManage;
