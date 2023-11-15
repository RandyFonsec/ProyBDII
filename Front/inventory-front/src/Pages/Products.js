import React, {useState, useEffect} from 'react';

import CardAdd from '../Components/CardAdd.js'
import CardTable from '../Components/CardTable.js'


import controller from '../Controller/controller.js'


function Products() {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
      try {
        const prods = await controller.getProducts(2);
        setProducts(prods);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

  useEffect(() => {
    

    fetchData();
  }, []); 
  
  return (
    
    <>

    <div>

    <CardAdd products = {products} add = {setProducts}/>
    <CardTable products = {products} prodHandler = {fetchData}/>
    
    </div>
    </>
  );
}

export default Products;