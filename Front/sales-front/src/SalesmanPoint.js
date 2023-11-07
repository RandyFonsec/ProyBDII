import React, { useState } from 'react';
import Navigation from './Navigation.js';
import Inbox from './Inbox.js';
import SelectedOrder from './SelectedOrder.js';

const style = {
  height: '100vh',
  margin: '5%',
};

function SalesmanPoint() {
  const [selectedOrder, setSelectedOrder] = useState(-1);
  const handleOrderSelect = (orderInfo) => {
    setSelectedOrder(orderInfo);
  };

  return (
    <>

      <Navigation />
      <div style={style}>
        <h1 className="mb-5">Módulo de ventas</h1>
        <Inbox onOrderSelect={handleOrderSelect} />
        <SelectedOrder selectedOrder={selectedOrder} />
      </div>

    </>
  );
}

export default SalesmanPoint;
