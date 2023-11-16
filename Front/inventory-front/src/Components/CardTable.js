import React, {useState, useEffect} from 'react';

import CustomCard from './CustomCard.js'
import CustomModal from './CustomModal.js'
import CustomDialog from './CustomDialog.js'
import FormProduct from './FormProduct.js'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


import controller from '../Controller/controller.js'


function CardTable({products, prodHandler}) {
  const [editProduct, setEditProduct] = useState(null);
  const [modal, setModal] = useState(false);


  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');

  
  const handleEditButton = (product) => {
    setEditProduct(product);
    setModal(true);
  }


  const handleDeleteButton = (id) => {

  }

  

  const handleUpdate = async (product) => {
    try {
      product.wh_id = 1;
      const insertResult = await controller.updateProduct(product);

      if(insertResult){
        const editedProduct = insertResult[0];
        
        //Refresh products
        prodHandler();

        setModal(false);

        setShow(true);
        setTitle("Éxito");
        setMsg('Producto actualizado exitosamente');

      }

    } catch (error) {
      console.error('Error en la función handleUpdate:', error);
    }
  };

  



  return (
    
    <>
    {modal && (
      <CustomModal state = {modal} close = {() => setModal(false)}>     
        <FormProduct product_in = {editProduct} handleButton = {handleUpdate}/>  
      </CustomModal>
    )}

    <div >
    <CustomDialog state = {show} handler = {setShow} title = {title} message = {msg}/>

    <CustomCard title = "Tabla de productos:">

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Disponible</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.product_id}>
                  <td>{product.unique_code}</td>
                  <td>{product.name}</td>
                  <td>{product.category_name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.available ? "SÍ" : "NO" }</td>
                  <td style={{direction:'flex', flexDirection:'row', textAlign:'center'}}>
                    <Button 
                    onClick = {() => {handleEditButton(product)}}
                    variant = "primary">Editar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>


    </CustomCard>



  
     
    </div>
    </>
    



  );
}

export default CardTable;