import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Navbar/Navbar";

const DesignUpload = () => {
  const { constructionOrderId } = useParams(); // Get the constructionOrderId from the URL
  const location = useLocation();
  const orderDetails = location.state || {}; // Use an empty object as default

  const [customerInfo, setCustomerInfo] = useState({
    customerName: orderDetails.customerName || "",
    phone: orderDetails.phone || "",
    address: orderDetails.address || "",
    request: orderDetails.customerRequest || "",
    startDate: orderDetails.startDate || "",
    staffName: orderDetails.staffName || "",
  });

  const [images, setImages] = useState({
    image2D: null,
    image3D: null,
    frontView: null,
    rearView: null,
  });

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setImages((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data to send
    const formData = new FormData();
    formData.append("url2dDesign", images.image2D);
    formData.append("url3dDesign", images.image3D);
    formData.append("urlFrontDesign", images.frontView);
    formData.append("urlBackDesign", images.rearView);

    try {
      // Make the API call to upload the design images
      const response = await fetch(
        `http://localhost:8080/design/ownedTasks/${constructionOrderId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Design uploaded successfully!");
      } else {
        console.error("Error uploading design");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-5">
            <h2 className="mb-4">Customer Information</h2>
            <div className="mb-3">
              <strong>Name:</strong> {customerInfo.customerName}
            </div>
            <div className="mb-3">
              <strong>Phone:</strong> {customerInfo.phone}
            </div>
            <div className="mb-3">
              <strong>Address:</strong> {customerInfo.address}
            </div>
            <div className="mb-3">
              <strong>Start Date:</strong>{" "}
              {new Date(customerInfo.startDate).toLocaleDateString()}
            </div>
            <div className="mb-3">
              <strong>Staff Name:</strong> {customerInfo.staffName}
            </div>

            {/* Request Section */}
            <h3 className="mt-4">Customer Request</h3>
            <textarea
              className="form-control"
              name="request"
              rows="4"
              placeholder="Enter customer request..."
              value={customerInfo.request}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, request: e.target.value })
              }
            />
          </div>

          <div className="col-md-7">
            <h2 className="mb-4">Upload Design Files</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>2D Design Image:</label>
                <input
                  type="file"
                  name="image2D"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="mb-3">
                <label>3D Design Image:</label>
                <input
                  type="file"
                  name="image3D"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="mb-3">
                <label>Front View Image:</label>
                <input
                  type="file"
                  name="frontView"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="mb-3">
                <label>Rear View Image:</label>
                <input
                  type="file"
                  name="rearView"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Design
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignUpload;
