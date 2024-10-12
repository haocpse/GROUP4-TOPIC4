// import React from 'react';
// import styles from './ItemsList.module.css';

// const ItemsList = ({ items, handleItemChange }) => {
//   return (
//     <div className={styles.itemsListContainer}>
//       <h3>Available Items</h3>
//       <ul>
//         {items.map((item, index) => (
//           <li key={index} className={styles.item}>
//             <input
//               type="checkbox"
//               value={item.price}
//               onChange={handleItemChange}
//             />
//             <span>{item.name} - ${item.price}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ItemsList;
import React from 'react';

const ItemsList = ({ items }) => {
  return (
    <div>
      <h3>Item List</h3>
      {items.map((item, index) => (
        <div key={index}>
          <input
            type="checkbox"
            value={item.price}
          />
          <label>{item.name} - ${item.price}</label>
        </div>
      ))}
    </div>
  );
};

export default ItemsList;

