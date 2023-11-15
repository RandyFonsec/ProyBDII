import React, { useState, useEffect } from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import CustomCard from './CustomCard.js';

import controller from './Controller/controller.js';





function combineProducts(productsData, prodsFromInv) {
  //Combine the two arrays in one
  return prodsFromInv.map((prodFromInv) => {
    const productData = productsData.find((product) => product.product_id === prodFromInv.unique_code);
    if (productData) {
      return { ...prodFromInv, quantity: productData.quantity };
    } else {
      return prodFromInv;
    }
  });
}




function SelectedOrder({ selectedOrder }) {
  const [products, setProducts] = useState([]);
  const [productsFromOrder, setProductsFromOrder] = useState([]);
  //The order can be processed
  const [state, setState] = useState(true);
  useEffect(() => {
    if (selectedOrder !== -1) {
      const fetchProducts = async () => {
        try {


          //Products of an order
          const productsData = await controller.getProducts(selectedOrder);
          //Only the unique codes
          const productIdsList = productsData.map((product) => product.product_id);
          //Query to stock in each inventory
          const prodsFromInv = await controller.getProductStockSummary(productIdsList);

          //combine 2 arrays in 1
          const prods = combineProducts(productsData, prodsFromInv);  
          
          setState(true);
          prods.forEach((product, index) => {
            const total = product.inv_1 + product.inv_2 + product.inv_3;
            //Is a product with enough inventory
            product.isValid = total >= product.quantity;
            if(!product.isValid)
              setState(false);
          });

          setProducts(prods);


        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      fetchProducts();
    } else {
      // Si no se ha seleccionado una orden, restablece la lista de productos
      setProducts([]);
    }
  }, [selectedOrder]);

  return (
    <div>
      <CustomCard title="Selección:">
        {selectedOrder !== -1 ? (
          <div>
            
            <p className="fs-4">ID de la Orden: {selectedOrder}
              {state ? (
                <>
                <Badge className="mx-3" bg="primary">Válida</Badge>
                <Button variant="success">Generar traslado</Button>
                </>
                ):(
                <>
                <Badge className="mx-3" bg="danger">Inválida</Badge>
                <Button variant="danger">Rechazar</Button>
                </>
              )}
            </p>
            
            <h4>Productos de la orden:</h4>
            <Table striped bordered hover responsive variant="dark">
              
              <thead>
                <tr>

                  <th>ID del Producto</th>
                  <th>Solicitado</th>
                  <th>Cantidad WH1</th>
                  <th>Cantidad WH2</th>
                  <th>Cantidad WH3</th>
                  <th>Stock Suf</th>
                  
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.unique_code}>
                    <td>{product.unique_code}</td>
                    <td>{product.quantity}</td>
                    <td>{product.inv_1}</td>
                    <td>{product.inv_2}</td>
                    <td>{product.inv_3}</td>
                    <td style={{ textAlign: 'center', color : 'red', fontSize:'1.5rem' }} >
                    {product.isValid ? "✅": "X"}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <p className="fs-4">Selecciona una orden para ver los detalles.</p>
        )}
      </CustomCard>
    </div>
  );
}

export default SelectedOrder;
