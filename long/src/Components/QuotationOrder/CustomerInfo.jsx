import React from 'react';

const CustomerInfo = ({ name, phone, address }) => {
  return (
    <div>
      <h1>Customer Information</h1>
      <p>{name}</p>
      <p>{phone}</p>
      <p>{address}</p>
    </div>
  );
};

export default CustomerInfo;
