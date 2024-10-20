import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ViewDesign = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [designDetail, setDesignDetail] = useState({});

  // fetch design ne
  useEffect(() => {
    const fetchDesignDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/manage/designs/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
          }
        });
        setDesignDetail(response.data.data);
      } catch (error) {
        console.error("Error fetching design detail", error);
        toast.error("Fail to fetch design detail!");
      }
    };
    fetchDesignDetail();
  }, [id]);

  const handleApproval = async (status) => {
    try {
      await axios.post(`http://localhost:8080/manage/designs/${id}`, {
        status: status
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
        }
      });
      toast.success(`Design ${status} successfully!`);
    } catch (error) {
      console.error("Error approving/rejecting design", error);
      toast.error(`Fail to update status! ${error.response ? error.response.data.message : ''}`);
    }
  };

  const confirmApproval = (status) => {
    const action = status ? "APPROVED" : "REJECTED";
    const confirmed = window.confirm(`Are you sure to want to ${action} this design?`);
    if (confirmed) {
      handleApproval(status);
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <h2 className="text-center" style={{ color: 'black' }}>Design Details</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Design ID: {designDetail.designId}</h5>
          <p className="card-text"><strong>Customer Name:</strong> {designDetail.customerName}</p>
          <p className="card-text"><strong>Customer Request:</strong> {designDetail.customerRequest}</p>

          <div className="img-design">
            <h6>Design Images:</h6>
            <div className="row text-center">
              <div className="col-md-4 mb-3">
                <div>
                  <div className="overlay">2D Design</div>
                  <div className="image-container">
                    <img
                      src={designDetail.url2dDesign}
                      alt="2D Design"
                      className="img-fluid img-thumbnail"
                      style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div>
                  <div className="overlay">3D Design</div>
                  <div className="image-container">
                    <img
                      src={designDetail.url3dDesign}
                      alt="3D Design"
                      className="img-fluid img-thumbnail"
                      style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div>
                  <div className="overlay">Front Design</div>
                  <div className="image-container">
                    <img
                      src={designDetail.urlFrontDesign}
                      alt="Front Design"
                      className="img-fluid img-thumbnail"
                      style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="btn btn-success me-2"
            onClick={() => confirmApproval("APPROVED")}
          >
            Approve
          </button>
          <button
            className="btn btn-danger me-2"
            onClick={() => confirmApproval("REJECTED")}
          >
            Reject
          </button>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default ViewDesign;
