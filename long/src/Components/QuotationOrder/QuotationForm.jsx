import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemsList from './ItemsList';
import styles from './QuotationForm.module.css';

const QuotationForm = ({ onFormSubmit }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(''); // Package đã chọn
  const [packages, setPackages] = useState([]); // Danh sách packages từ API
  const [items, setItems] = useState([]); // Danh sách items từ package đã chọn
  const [volume, setVolume] = useState(''); // Volume mới thêm

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

  // Cập nhật danh sách items khi package được chọn
  useEffect(() => {
    if (selectedPackage) {
      const selectedPkg = packages.find(pkg => pkg.packageId === selectedPackage);
      setItems(selectedPkg ? selectedPkg.items : []);
    } else {
      setItems([]); // Xóa items nếu không có package được chọn
    }
  }, [selectedPackage, packages]);

  const handleItemChange = (event) => {
    const itemPrice = parseFloat(event.target.value);
    const isChecked = event.target.checked;

    setSelectedItems((prevItems) =>
      isChecked
        ? [...prevItems, { price: itemPrice, name: event.target.nextSibling.textContent }]
        : prevItems.filter((item) => item.price !== itemPrice)
    );
  };

  const handleExport = () => {
    if (!selectedPackage || !volume) {
      alert("Please select a package and enter a volume before exporting the quotation.");
      return;
    }
    // Chuyển package, các item đã chọn và volume qua `QuotationPage`
    onFormSubmit({ selectedItems, selectedPackage, volume });
  };

  return (
    <div className={styles.quotationFormContainer}>
      <label className={styles.label} htmlFor="package">Select Package:</label>
      <select
        id="package"
        className={styles.selectBox}
        value={selectedPackage}
        onChange={(e) => setSelectedPackage(e.target.value)}
      >
        <option value="">Select package</option>
        {packages.map((pkg) => (
          <option key={pkg.packageId} value={pkg.packageId}>
            {pkg.packageType} - ${pkg.price}
          </option>
        ))}
      </select>

      <label className={styles.label} htmlFor="volume">Enter Volume:</label>
      <input
        type="number"
        id="volume"
        className={styles.inputBox}
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
        placeholder="Enter volume"
      />

      {/* Hiển thị danh sách item dựa trên package đã chọn */}
      <ItemsList items={items} handleItemChange={handleItemChange} />

      <div className={styles.submitButtonContainer}>
        <button type="button" className={styles.submitButton} onClick={handleExport}>
          Export Quotation
        </button>
      </div>
    </div>
  );
};

export default QuotationForm;
