import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './QuotationOrder.module.css';
import { jwtDecode } from "jwt-decode";

const QuotationOrder = () => {
  const { constructionOrderId } = useParams();
  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [packageOptions, setPackageOptions] = useState([]);
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [items, setItems] = useState([]);
  const [itemsOfSelectedPackage, setItemsOfSelectedPackage] = useState([]); // State để lưu danh sách item từ package
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [promotionId, setPromotionId] = useState('');
  const [customerRequest, setCustomerRequest] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

    const fetchQuotationOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/informationCustomer/${constructionOrderId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
          }
        });
        setQuotation(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quotation order:", error);
        setLoading(false);
      }
    };

    const fetchPackageOptions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/packages`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
          }
        });
        setPackageOptions(response.data.data.packagesList);
        setItems(response.data.data.packageConstructionList);
      } catch (error) {
        console.error("Error fetching package options:", error);
      }
    };

    fetchQuotationOrder();
    fetchPackageOptions();
  }, [constructionOrderId]);

  const getItems = (packageId) => {
    const filteredItems = items.filter(item => item.packageId === packageId);
    setItemsOfSelectedPackage(filteredItems);
  };

  const handlePackageChange = (event) => {
    const packageId = event.target.value;
    setSelectedPackage(packageId);
    if (packageId) {
      getItems(packageId); // Gọi hàm lấy items khi package thay đổi
    } else {
      setItemsOfSelectedPackage([]); // Xóa danh sách items nếu không có package nào được chọn
    }
  };

  const handleExportQuotation = async () => {
    const requestData = {
      packageId: selectedPackage,
      length,
      height,
      width,
      customerRequest,
      startDate,
      endDate,
      promotionId,
    };

    try {
      await axios.post(`http://localhost:8080/constructionOrders/${constructionOrderId}/quotation`, requestData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
        }
      });
      navigate(`/consult/ownedTasks/${constructionOrderId}/quotation`);
    } catch (error) {
      console.error("Error submitting quotation data:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (!quotation) {
    return <div className="text-center py-5">No quotation data found.</div>;
  }

  return (
    <div className={`${styles.quotationOrderContainer} container mt-5`}>
      <div className="card shadow">
        <div className={`card-header text-center ${styles.bgRed} text-white`}>
          <h2 className="text-center">Quotation</h2>
          <div className="d-flex justify-content-between">
            <p><strong>Order ID:</strong> {constructionOrderId}</p>
            <p><strong>Consultant:</strong> {quotation.staffName}</p>
          </div>
        </div>
        <div className="card-body">
          <h3>Information customer:</h3>
          <div className="row mb-3">
            <div className="col-md-6">
              <p><strong>Customer: </strong> {quotation.customerName}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Phone: </strong> {quotation.phone}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Address: </strong> {quotation.address}</p>
            </div>
            <div className="col-md-12">
              <p><strong>Request: </strong></p>
              <textarea
                className="form-control"
                id="customerRequest"
                value={customerRequest}
                onChange={(e) => setCustomerRequest(e.target.value)}
                placeholder={quotation.customerRequest}
                rows="6" // Adjust the number of rows to set the height of the textarea
              />
            </div>
          </div>
          <h3>Quotation:</h3>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="length"><strong>Length:</strong></label>
              <input
                type="text"
                className="form-control"
                id="length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="Enter length"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="width"><strong>Width:</strong></label>
              <input
                type="text"
                className="form-control"
                id="width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="Enter width"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="height"><strong>Height:</strong></label>
              <input
                type="text"
                className="form-control"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="package"><strong>Package:</strong></label>
              <select
                className="form-control"
                id="package"
                value={selectedPackage}
                onChange={handlePackageChange}
              >
                <option value="">Select Package</option>
                {packageOptions.map((pkg) => (
                  <option key={pkg.packageId} value={pkg.packageId}>
                    {pkg.packageType}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <h3>Construction contents:</h3>
          {itemsOfSelectedPackage.map((item, index) => (
            <div key={index}>
              <label>{item.content}</label>
            </div>
          ))}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="startDate"><strong>Start Date:</strong></label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="endDate"><strong>End Date:</strong></label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-success" onClick={handleExportQuotation}>Export Quotation</button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default QuotationOrder;

