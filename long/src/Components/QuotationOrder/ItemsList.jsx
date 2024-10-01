import React from 'react';

const ItemsList = ({ items, handleItemChange }) => {
  return (



    <div id="items-container">
      <h3>Items List</h3>
      <ul id="items-list">
        {items.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={`item-${index}`}
              value={item.price}
              onChange={handleItemChange}
            />
            <label htmlFor={`item-${index}`}>
              {item.name}: {item.description}
            </label>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default ItemsList;
