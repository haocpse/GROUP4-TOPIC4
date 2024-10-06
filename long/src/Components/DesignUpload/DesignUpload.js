import React, { useState } from "react";
import "./DesignUpload.css"; // Import CSS file for styling
import Navbar from "../Navbar/Navbar";

const DesignUpload = () => {
  const [customerInfo, setCustomerInfo] = useState({
    customerName: "Tú Đặng",
    phone: "0707804907",
    address: "1052 Quang Trung, quận Gò Vấp, TPHCM",
    request: "them san vuon", // Added request field
  });

  const [images, setImages] = useState({
    image2D: null,
    image3D: null,
    frontView: null,
    rearView: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setImages((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Customer Info:", customerInfo);
    console.log("Images:", images);
  };

  return (
    <>
      <Navbar />
      <div className="design-upload mt-4">
        <div className="left-column">
          <h2>Customer Information</h2>
          <p>Name: {customerInfo.customerName}</p>
          <p>Phone: {customerInfo.phone}</p>
          <p>Address: {customerInfo.address}</p>

          {/* Request Section */}
          <h2>Customer Request</h2>
          <textarea
            name="request"
            rows="4"
            placeholder="Enter customer request..."
            value={customerInfo.request}
            onChange={handleInputChange}
          />
        </div>

        <div className="right-column">
          <h2>Upload Images</h2>
          <div className="upload-container">
            <div className="upload-box">
              <label>2D Image:</label>
              <input
                type="file"
                name="image2D"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="upload-box">
              <label>3D Image:</label>
              <input
                type="file"
                name="image3D"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="upload-box">
              <label>Front View:</label>
              <input
                type="file"
                name="frontView"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="upload-box">
              <label>Rear View:</label>
              <input
                type="file"
                name="rearView"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default DesignUpload;
