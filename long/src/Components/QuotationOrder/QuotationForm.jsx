import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemsList from './ItemsList';
import styles from './QuotationForm.module.css';

const QuotationForm = ({ onFormSubmit }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(''); // Package đã chọn
  const [packages, setPackages] = useState([]); // Danh sách packages từ API
  const [items, setItems] = useState([]); // Danh sách items từ API
  const [volume, setVolume] = useState(''); // Volume mới thêm

  // Gọi API lấy danh sách packages khi component mount
  useEffect(() => {
    axios.get('localhost:8080/consult/ownedTasks /{constructionOrderId}/packages')
      .then(response => {
        setPackages(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the packages!", error);
      });
  }, []);

  // Gọi API lấy danh sách items dựa trên package đã chọn
  useEffect(() => {
    if (selectedPackage) {
      axios.get(`http://localhost:8080/quotations/packages/${selectedPackage}/items`)
        .then(response => {
          setItems(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the items!", error);
        });
    }
  }, [selectedPackage]);

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
        {packages.map((pkg, index) => (
          <option key={index} value={pkg.name}>
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

// import React, { useEffect, useState } from 'react';
// import styles from './QuotationForm.module.css';

// // Mock data cho packages và items
// const mockPackages = [
//   { name: "Basic", price: 500, description: "Gói cơ bản cho thiết kế hồ cá koi đơn giản." },
//   { name: "Standard", price: 1000, description: "Gói tiêu chuẩn bao gồm hệ thống lọc và đèn chiếu sáng." },
//   { name: "Premium", price: 2000, description: "Gói cao cấp bao gồm thác nước, hệ thống lọc cao cấp và đèn LED RGB." },
// ];

// const mockItems = {
//   "Basic": [
//     { name: "Bể cá nhỏ", price: 100 },
//     { name: "Máy bơm nước", price: 150 },
//     { name: "Bộ lọc nước cơ bản", price: 250 },
//   ],
//   "Standard": [
//     { name: "Bể cá vừa", price: 200 },
//     { name: "Máy bơm nước công suất cao", price: 300 },
//     { name: "Bộ lọc nước tiêu chuẩn", price: 500 },
//     { name: "Đèn chiếu sáng LED", price: 100 },
//   ],
//   "Premium": [
//     { name: "Bể cá lớn", price: 500 },
//     { name: "Máy bơm nước công suất cao cấp", price: 600 },
//     { name: "Bộ lọc nước cao cấp", price: 800 },
//     { name: "Thác nước", price: 300 },
//     { name: "Hệ thống đèn LED RGB", price: 400 },
//   ],
// };

// const QuotationForm = ({ onFormSubmit }) => {
//   const [selectedItems, setSelectedItems] = useState([]); // Danh sách các item đã chọn
//   const [selectedPackage, setSelectedPackage] = useState(''); // Package đã chọn
//   const [packages, setPackages] = useState([]); // Danh sách packages
//   const [items, setItems] = useState([]); // Danh sách items cho package đã chọn
//   const [extraItem, setExtraItem] = useState(''); // Item bổ sung từ người dùng
//   const [volume, setVolume] = useState(''); // Volume

//   // Load packages từ mock data khi component mount
//   useEffect(() => {
//     setPackages(mockPackages);
//   }, []);

//   // Load items từ mock data dựa trên package đã chọn
//   useEffect(() => {
//     if (selectedPackage) {
//       setItems(mockItems[selectedPackage] || []);
//     }
//   }, [selectedPackage]);

//   // Xử lý khi người dùng nhập item bổ sung
//   const handleAddExtraItem = () => {
//     if (extraItem.trim()) {
//       setSelectedItems([...selectedItems, { name: extraItem, price: 0 }]); // Giả sử giá cho item tùy chọn là 0
//       setExtraItem(''); // Xóa nội dung sau khi thêm
//     }
//   };

//   const handleExport = () => {
//     if (!selectedPackage || !volume) {
//       alert("Please select a package and enter a volume before exporting the quotation.");
//       return;
//     }
//     // Chuyển package, các item đã chọn, và volume qua `QuotationPage`
//     onFormSubmit({ selectedItems: [...items, ...selectedItems], selectedPackage, volume });
//   };

//   return (
//     <div className={styles.quotationFormContainer}>
//       <label className={styles.label} htmlFor="package">Select Package:</label>
//       <select
//         id="package"
//         className={styles.selectBox}
//         value={selectedPackage}
//         onChange={(e) => setSelectedPackage(e.target.value)}
//       >
//         <option value="">Select package</option>
//         {packages.map((pkg, index) => (
//           <option key={index} value={pkg.name}>
//             {pkg.name} - ${pkg.price}
//           </option>
//         ))}
//       </select>

//       <label className={styles.label} htmlFor="volume">Enter Volume:</label>
//       <input
//         type="number"
//         id="volume"
//         className={styles.inputBox}
//         value={volume}
//         onChange={(e) => setVolume(e.target.value)}
//         placeholder="Enter volume"
//       />

//       <div className={styles.itemsContainer}>
//         <h3>Items in Selected Package:</h3>
//         <ul>
//           {items.map((item, index) => (
//             <li key={index}>{item.name} - ${item.price}</li>
//           ))}
//         </ul>

//         <div className={styles.extraItemContainer}>
//           <input
//             type="text"
//             value={extraItem}
//             onChange={(e) => setExtraItem(e.target.value)}
//             placeholder="Add extra item"
//             className={styles.inputBox}
//           />
//           <button onClick={handleAddExtraItem} className={styles.addButton}>Add</button>
//         </div>

//         <h4>Extra Items:</h4>
//         <ul>
//           {selectedItems.map((item, index) => (
//             <li key={index}>{item.name}</li>
//           ))}
//         </ul>
//       </div>

//       <div className={styles.submitButtonContainer}>
//         <button type="button" className={styles.submitButton} onClick={handleExport}>
//           Export Quotation
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuotationForm;
