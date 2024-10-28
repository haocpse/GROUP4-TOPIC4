import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './DesignUpload.module.css'; // Thêm các kiểu tùy chỉnh của bạn ở đây

const DesignUpload = () => {
  const [designDetail, setDesignDetail] = useState({});
  const { constructionOrderId } = useParams();
  const [image2D, setImage2D] = useState(null);
  const [image3D, setImage3D] = useState(null);
  const [frontView, setFrontView] = useState(null);
  const [rearView, setRearView] = useState(null);
  const navigate = useNavigate()

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/informationCustomer/${constructionOrderId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
          }
        });
        setDesignDetail(response.data.data);
      } catch (error) {
        console.error("Error fetching design details:", error);
      }
    };
    fetchDesign();
  }, [constructionOrderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image2D', image2D);
      formData.append('image3D', image3D);
      formData.append('frontView', frontView);
      // formData.append('rearView', rearView); // Uncomment if needed

      const response = await axios.post(`http://localhost:8080/constructionOrders/${constructionOrderId}/design`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
          'Content-Type': 'multipart/form-data' // Set Content-Type for form data
        }
      });

      if (response.status === 200) {
        alert("Design uploaded successfully!");
        // Reset the state to show uploaded images
        setImage2D(null);
        setImage3D(null);
        setFrontView(null);
        setRearView(null);
      } else {
        console.error("Error uploading design");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header text-center text-white bg-danger">
          <h2>Design</h2>
          <div className="d-flex justify-content-between">
            <p><strong>Order ID:</strong> {constructionOrderId}</p>
            <p><strong>Designer:</strong> {designDetail.staffName}</p>
          </div>
        </div>
        <div className="card-body">
          <div className="row mb-3 border">
            <div className="col-md-6">
              <p><strong>Name:</strong> {designDetail.customerName}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Phone:</strong> {designDetail.phone}</p>
            </div>
            <div className="col-md-12">
              <p><strong>Address:</strong> {designDetail.address}</p>
            </div>
            <div className="col-md-12">
              <p><strong>Request:</strong><br /> {designDetail.customerRequest}</p>
            </div>
          </div>

          <h2 className="mb-4">Uploaded Images</h2>
          <div className="row mb-4">
            {image2D && (
              <div className="col-md-4 text-center">
                <p>2D View</p>
                <img src={URL.createObjectURL(image2D)} alt="Image 2D" className="img-fluid mb-2" />

              </div>
            )}
            {image3D && (
              <div className="col-md-4 text-center">
                <p>3D View</p>
                <img src={URL.createObjectURL(image3D)} alt="Image 3D" className="img-fluid mb-2" />

              </div>
            )}
            {frontView && (
              <div className="col-md-4 text-center">
                <p>Front View</p>
                <img src={URL.createObjectURL(frontView)} alt="Front View" className="img-fluid mb-2" />

              </div>
            )}
            {/* {rearView && (
              <div className="col-md-3 text-center">
                 <p>Rear View</p>
                <img src={URL.createObjectURL(rearView)} alt="Rear View" className="img-fluid mb-2" />
               
              </div>
            )} */}
          </div>

          <h2 className="mb-4">Upload Design Files</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Image 2D:</label>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setImage2D)}
              />
            </div>
            <div className="mb-3">
              <label>Image 3D:</label>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setImage3D)}
              />
            </div>
            <div className="mb-3">
              <label>Front View:</label>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setFrontView)}
              />
            </div>
            {/* <div className="mb-3">
              <label>Rear View:</label>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setRearView)}
              />
            </div> */}
            <button type="submit" className="btn btn-primary">Upload</button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default DesignUpload;
