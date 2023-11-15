import React, {useState} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Products from './Pages/Products.js'
import Navigation  from './Components/Navigation.js'
import styles from './App.module.css'

function App() {
  return (
    <div className = {styles.body}>

      <nav className = {styles.nav}>
        <Navigation/>
      </nav>

      <div className = {styles.main}>
        <Routes>
          <Route path="/" element={<Navigate to="/Productos" />}/>
          <Route path="/Categorias" element={<h1>HOLA</h1>} />
          <Route path="/Productos" element={<Products/>} />
          <Route path="/Empleados" element={<h1>HOLA EMPLEADOS</h1>} />
          <Route path="*" element={<Navigate to="/Productos" />} />
        </Routes>
      </div>



    </div>
  );
}

export default App;
