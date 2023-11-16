import React, {useState} from 'react';

import FormProduct from './FormProduct.js'
import CustomCard from './CustomCard.js'
import CustomDialog from './CustomDialog.js'

import controller from '../Controller/controller.js'

function CardAdd({products, add}) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');



  const handleAdd = async (product) => {
    try {
      product.wh_id = 1;
      const insertResult = await controller.insertProduct(product);

      if (insertResult.success) {
        setShow(true);
        setTitle("Éxito");
        setMsg(insertResult.msg);
        add([...products, product]);
      } else {
        setShow(true);
        setTitle("Error");
        setMsg('Error al insertar el producto');
        console.error('Error al insertar el producto:', insertResult.msg);
      }
    }catch (error) {
      console.error('Error en la función handleAdd:', error);
    }
  };
  
  return (
    
    <>
<>

    <CustomDialog state = {show} handler = {setShow} title = {title} message = {msg}/>
</>


    <CustomCard title = "Agregar Producto:">
      <FormProduct handleButton = { handleAdd }/>  
    </CustomCard>
    
    </>
  );
}

export default CardAdd;