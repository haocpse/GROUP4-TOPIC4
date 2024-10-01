import React from 'react';

const ItemsList = ({ items, handleItemChange }) => {
  return (
    <div>
      <h3>Item List</h3>
      {items.map((item, index) => (
        <div key={index}>
          <input
            type="checkbox"
            value={item.price}
            onChange={handleItemChange}
          />
          <label>{item.name} - ${item.price}</label>
        </div>
      ))}
    </div>
  );
};

export default ItemsList;
