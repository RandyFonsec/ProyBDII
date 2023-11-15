import React, {useState, useEffect} from 'react';

import CustomCard from './CustomCard.js'

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



import controller from '../Controller/controller.js'



function FormProduct({product_in, handleButton}){
  const [product, setProduct] = useState(product_in);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await controller.getProdCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []); 


  const handleSelectChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = categories[selectedIndex];
    
    setProduct({ 
      ...product, 
      category_name: selectedOption.name, 
      category_id: selectedOption.prod_cat_id 
    });

  };


  return (

	<>
	<Container>
      <Row >
        <Col>
          <Stack gap={1} className="col-md-5 mx-auto">
          
          <Form>

          <Form.Group className="mb-3" controlId="1">
            <Form.Label>Código único:</Form.Label>
            <Form.Control
            value={product?.unique_code}
            onChange={(e) => setProduct({ ...product, unique_code: e.target.value })} 
            type="text" 
            placeholder="HMR456" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="2">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control 
            value={product?.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })} 
            type="text" 
            placeholder="Martillo" />
          </Form.Group>

          <Form.Group controlId="3">
            <Form.Label>Categoría:</Form.Label>
            <Form.Select onChange={handleSelectChange}>
              {categories.map((option, index) => (
                <option key={index} value={option.category_id}>
                  {option.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          </Form>
          </Stack>
        </Col>


        <Col>
          <Stack gap={1} className="col-md-5 mx-auto">
          <Form>

          <Form.Group className="mb-3" controlId="4">
            <Form.Label>Stock</Form.Label>
            <Form.Control 
            value={product?.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })} 
            type="number" 
            min={0}
            placeholder="1000" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="5">
            <Form.Label>Precio</Form.Label>
            <Form.Control 
            value={product?.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })} 
            type="number" 
            min={0}
            placeholder="375.00" />
          </Form.Group>

          <Form.Check
            inline
            label="Disponible"
            onChange={() => setProduct({ ...product, available: true })}
            name="group1"
            type='radio'
            id='1'
          />
          <Form.Group className="mb-3" controlId="6">
          <Form.Check
            inline
            label="No Disponible"
            onChange={() => setProduct({ ...product, available: false })}
            name="group1"
            type='radio'
            id='2'
          />
          </Form.Group>
          </Form>
        
          

          </Stack>
        </Col>
      </Row>


      <Row>
      <Col xs={7}></Col>
      <Col className="">
        <Stack gap={1} className="col-md-5 mx-auto">
          <Button 
          onClick = {() =>{ handleButton(product);}} 
          className="mt-5" variant="primary">
            Agregar
          </Button>
        </Stack>
          
      </Col>


      </Row>
    </Container>
    
    </>    



);
}

export default FormProduct;