import React, { useEffect, useState } from 'react';
import controller from './Controller/controller.js';
import CustomCard from './CustomCard.js';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


//A Date Converter
function getDate(oldDate){
  const date = new Date(oldDate);
  const day = date.getDate();
  const month = date.getMonth() + 1; //Starts at 0 
  const year = date.getFullYear();
  const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

  return formattedDate;
}


const OrdersTable = ({onOrderSelect}) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Llama a la función getOrders del controlador para obtener los datos
    const fetchOrders = async () => {
      try {
        const response = await controller.getOrders();
        setOrders(response);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();

  }, []);



  function handleClick(idOrder) {
    onOrderSelect(idOrder);
  }

  return (
     <>
      <CustomCard title ="Bandeja de órdenes">

        <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>ID Orden</th>
            <th>Fecha</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{getDate(order.date)}</td>
              <td style={{ textAlign: 'center' }}>

              < Button 
                variant="light"
                onClick={() => handleClick(order.order_id)}>

                Revisar

                </Button>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>

   
      
    
      </CustomCard>
     </>
  );
};

export default OrdersTable;
 