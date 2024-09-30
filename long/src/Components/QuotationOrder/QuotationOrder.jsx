import React from 'react';
import './QuotationOrder.css';
import CustomerInfo from './CustomerInfo';
import QuotationForm from './QuotationForm';

function App() {
  const customer = {
    name: "Nguyen Van A",
    phone: "0987654321",
    address: "123 Street, Hanoi"
  };

  return (
    <div className="App">
      <CustomerInfo name={customer.name} phone={customer.phone} address={customer.address} />
      <QuotationForm />
    </div>
  );
}

export default App;
