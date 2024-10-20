import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './DesignUpload.module.css'; // Thêm các kiểu tùy chỉnh của bạn ở đây

const UpdateDesign = () => {
  const [designDetail, setDesignDetail] = useState({});
  const { designId } = useParams();
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
        const response = await axios.get(`http://localhost:8080/design/designs/${designId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
          }
        });
        setDesignDetail(response.data.data);
        setImage2D(response.data.data.url2dDesign)
        setImage3D(response.data.data.url3dDesign)
        setFrontView(response.data.data.urlFrontDesign)
      } catch (error) {
        console.error("Error fetching design details:", error);
      }
    };
    fetchDesign();
  }, [designId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Check if image2D is a file (new upload), if not, send back the old URL
      if (image2D instanceof File) {
        formData.append('image2D', image2D);
      } else {
        formData.append('image2D', null); // Send back the old URL
      }

      // Check if image3D is a file (new upload), if not, send back the old URL
      if (image3D instanceof File) {
        formData.append('image3D', image3D);
      } else {
        formData.append('image3D', null); // Send back the old URL
      }

      // Check if frontView is a file (new upload), if not, send back the old URL
      if (frontView instanceof File) {
        formData.append('frontView', frontView);
      } else {
        formData.append('frontView', null); // Send back the old URL
      }

      const response = await axios.put(`http://localhost:8080/design/designs/${designId}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
          'Content-Type': 'multipart/form-data', // Set Content-Type for form data
        },
      });

      if (response.status === 200) {
        alert("Design uploaded successfully!");
        // Reset state to display current URLs again (this resets to URLs)
        setImage2D(designDetail.url2dDesign);
        setImage3D(designDetail.url3dDesign);
        setFrontView(designDetail.urlFrontDesign);
        setRearView(null);  // In case you later implement rearView handling
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
        <div className="card-header text-center bg-primary text-white">
          <h2>Customer Information</h2>
          <p>Order ID: {designDetail.constructionOrderId}</p>
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
              <p><strong>Staff:</strong> {designDetail.designerName}</p>
            </div>
            <div className="col-md-12">
              <p><strong>Request:</strong><br /> {designDetail.customerRequest}</p>
            </div>
          </div>

          <div className="row mb-4">
            {image2D && (
              <div className="col-md-3 text-center">
                <p>2D View</p>
                {typeof image2D === 'string' ? (
                  <img src={image2D} alt="Image 2D" className="img-fluid mb-2" />
                ) : (
                  <img src={URL.createObjectURL(image2D)} alt="Image 2D" className="img-fluid mb-2" />
                )}
              </div>
            )}
            {image3D && (
              <div className="col-md-3 text-center">
                <p>3D View</p>
                {typeof image3D === 'string' ? (
                  <img src={image3D} alt="Image 3D" className="img-fluid mb-2" />
                ) : (
                  <img src={URL.createObjectURL(image3D)} alt="Image 3D" className="img-fluid mb-2" />
                )}
              </div>
            )}
            {frontView && (
              <div className="col-md-3 text-center">
                <p>Front View</p>
                {typeof frontView === 'string' ? (
                  <img src={frontView} alt="Front View" className="img-fluid mb-2" />
                ) : (
                  <img src={URL.createObjectURL(frontView)} alt="Front View" className="img-fluid mb-2" />
                )}
              </div>
            )}
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
      <button className="btn btn-secondary" onClick={() => navigate('/manage/requests')}>Go Manage</button>
    </div>

  );
};

export default UpdateDesign;
