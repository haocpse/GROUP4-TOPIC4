import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './QuotationOrder.module.css';
import ItemsList from './ItemsList'; // Import ItemsList component để hiển thị danh sách item

const QuotationOrder = () => {
  const { constructionOrderId } = useParams();
  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [packageOptions, setPackageOptions] = useState([]);
  const [volume, setVolume] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [items, setItems] = useState([]); // State để lưu danh sách item từ package
  const [endDate, setEndDate] = useState('');
  const [promotionId, setPromotionId] = useState('');
  const [packageConstructionIds, setPackageConstructionIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotationOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/consult/ownedTasks/${constructionOrderId}`);
        setQuotation(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quotation order:", error);
        setLoading(false);
      }
    };

    const fetchPackageOptions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/consult/packages`);
        setPackageOptions(response.data);
      } catch (error) {
        console.error("Error fetching package options:", error);
      }
    };

    fetchQuotationOrder();
    fetchPackageOptions();
  }, [constructionOrderId]);

  const fetchItems = async (packageId) => {
    try {
      const response = await axios.get(`http://localhost:8080/consult/packages/${packageId}/items`);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items for package:", error);
    }
  };

  const handlePackageChange = (event) => {
    const packageId = event.target.value;
    setSelectedPackage(packageId);
    if (packageId) {
      fetchItems(packageId); // Gọi hàm fetchItems khi package thay đổi
    }
  };

  const handleSubmit = async () => {
    const requestData = {
      packageId: selectedPackage,
      packageConstructionIds,
      volume,
      endDate,
      promotionId,
    };

    try {
      await axios.post(`http://localhost:8080/consult/ownedTasks/${constructionOrderId}`, requestData);
      navigate('/quotation', { state: { quotation: requestData } });
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
        <div className="card-header text-center bg-primary text-white">
          <h2>Quotation Order Details</h2>
          <p>Order ID: {constructionOrderId}</p>
        </div>
        <div className="card-body">
          {/* Các trường thông tin khác như volume, package, end date, promotion ID */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="package"><strong>Package:</strong></label>
              <select 
                className="form-control" 
                id="package" 
                value={selectedPackage} 
                onChange={handlePackageChange}
              >
                <option value="">Select Package</option>
                {packageOptions.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hiển thị danh sách items */}
          <ItemsList items={items} />

          <div className="d-flex justify-content-end">
            <button className="btn btn-success" onClick={handleSubmit}>Submit Quotation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationOrder;
