import React, { useState, useEffect } from 'react';
import controller from './Controller/controller.js'
function SalesmanPoint() {
  const [data, setData] = useState([]);
  const url = 'URL_DE_TU_API'; // Reemplaza 'URL_DE_TU_API' con la URL de tu API

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await controller.getOrders();
        setData(response);
      } catch (error) {
        console.error('Error en la función fetchData:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>API Consumer</h1>
      <ul>
      {"item.order_id " }|||{ " item.date"}
  {data.map((item, idx) => (
    <li key={idx}>{item.order_id } ---- { item.date}</li>
  ))}
</ul>

    </div>
  );
}

export default SalesmanPoint;
