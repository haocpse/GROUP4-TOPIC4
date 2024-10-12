import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemsList from './ItemsList';
import styles from './QuotationForm.module.css';

const QuotationForm = ({ onFormSubmit }) => {
  const [selectedPackage, setSelectedPackage] = useState(''); // Package đã chọn
  const [volume, setVolume] = useState(''); // Volume mới thêm
  const [packages, setPackages] = useState([]); // Danh sách packages từ API

  // Gọi API lấy danh sách packages khi component mount
  useEffect(() => {
    axios.get('http://localhost:8080/consult/ownedTasks/{constructionOrderId}/packages')
      .then(response => {
        setPackages(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the packages!", error);
      });
  }, []);

  const handleExport = () => {
    if (!selectedPackage || !volume) {
      alert("Please select a package and enter a volume before exporting the quotation.");
      return;
    }
    // Chuyển package và volume qua `QuotationPage`
    onFormSubmit({ selectedPackage, volume });
  };

  return (
    <div className={styles.quotationFormContainer}>
      <label className={styles.label} htmlFor="package">Select Package:</label>
      <select
        id="package"
        className={styles.selectBox}
        value={selectedPackage}
        onChange={(e) => setSelectedPackage(e.target.value)} // Cập nhật package đã chọn
      >
        <option value="">Select package</option>
        {packages.map((pkg) => (
          <option key={pkg.id} value={pkg.id}>
            {pkg.name} - ${pkg.price}
          </option>
        ))}
      </select>

      <label className={styles.label} htmlFor="volume">Enter Volume:</label>
      <input
        type="number"
        id="volume"
        className={styles.inputBox}
        value={volume}
        onChange={(e) => setVolume(e.target.value)} // Cập nhật volume
        placeholder="Enter volume"
      />

      <div className={styles.submitButtonContainer}>
        <button type="button" className={styles.submitButton} onClick={handleExport}>
          Export Quotation
        </button>
      </div>
    </div>
  );
};

export default QuotationForm;
