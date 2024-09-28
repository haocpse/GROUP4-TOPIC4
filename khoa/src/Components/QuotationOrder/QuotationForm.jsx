// QuotationForm.js
import React, { useState } from 'react';

const QuotationForm = () => {
  const [volume, setVolume] = useState('');
  const [package, setPackage] = useState('');
  const [items, setItems] = useState([]);

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const handlePackageChange = (event) => {
    setPackage(event.target.value);
  };

  const handleItemChange = (event) => {
    const itemId = event.target.value;
    const item = items.find((item) => item.id === itemId);
    if (item) {
      item.selected = event.target.checked;
    }
  };

  return (
    <div>
      <h2>Quotation Form</h2>
      <form>
        <label>
          Volume:
          <select value={volume} onChange={handleVolumeChange}>
            <option value="">Select a volume</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
        <label>
          Package:
          <select value={package} onChange={handlePackageChange}>
            <option value="">Select a package</option>
            <option value="package1">Package 1</option>
            <option value="package2">Package 2</option>
            <option value="package3">Package 3</option>
          </select>
        </label>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.selected}
                onChange={handleItemChange}
                value={item.id}
              />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default QuotationForm;