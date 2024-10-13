import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Navbar/Navbar";

const DesignUpload = () => {
  const [designDetail, setDesignDetail] = useState({})
  const { constructionOrderId } = useParams();
  const [image2D, setImage2D] = useState(null);
  const [image3D, setImage3D] = useState(null);
  const [frontView, setFrontView] = useState(null);
  const [rearView, setRearView] = useState(null);

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);  // Store the selected file
  };

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/design/ownedTasks/${constructionOrderId}`);
        setDesignDetail(response.data.data);
      } catch (error) {
        console.error("Error fetching quotation order:", error);
      }
    };
    fetchDesign()
  }, [constructionOrderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the API call to upload the design images
      const formData = new FormData();
      formData.append('image2D', image2D);
      formData.append('image3D', image3D);
      formData.append('frontView', frontView);
      formData.append('rearView', rearView);
      const response = await axios.post(`http://localhost:8080/design/ownedTasks/${constructionOrderId}`, formData);
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
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-5">
            <h2 className="mb-4">Customer Information</h2>
            <div className="mb-3">
              <strong>Name:</strong> {designDetail.customerName}
            </div>
            <div className="mb-3">
              <strong>Phone:</strong> {designDetail.phone}
            </div>
            <div className="mb-3">
              <strong>Address:</strong> {designDetail.address}
            </div>
            <div className="mb-3">
              <strong>Staff:</strong> {designDetail.staffName}
            </div>
            {/* Request Section */}
            <div className="col-md-12">
              <p><strong>Request: </strong> <br /> {designDetail.customerRequest}</p>
            </div>
          </div>

          <div className="col-md-7">
            <h2 className="mb-4">Upload Design Files</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-12">
                <label>Image 2D:</label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setImage2D)}
                />
              </div>
              <div className="mb-12">
                <label>Image 3D:</label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setImage3D)}
                />
              </div>
              <div className="mb-12">
                <label>Front View:</label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setFrontView)}
                />
              </div>
              <div className="mb-12">
                <label>Rear View:</label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setRearView)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Upload</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignUpload;
