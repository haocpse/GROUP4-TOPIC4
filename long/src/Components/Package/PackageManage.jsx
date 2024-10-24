import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const PackageManage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine which button should be active
  const isPackagePriceActive = location.pathname === "/package/package-price";
  const isPackageConstructionActive =
    location.pathname === "/package/package-construction";

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-light p-3">
          <h5>Create Package</h5>
          <Button
            variant={isPackagePriceActive ? "primary" : "outline-primary"}
            className="mb-2"
            onClick={() => navigate("/package/package-price")}
          >
            Package Price
          </Button>
          <Button
            variant={
              isPackageConstructionActive ? "secondary" : "outline-secondary"
            }
            onClick={() => navigate("/package/package-construction")}
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
