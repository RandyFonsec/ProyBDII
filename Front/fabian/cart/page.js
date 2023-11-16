"use client";

import styles from "@/styles/cart/cart.module.css";
import Navbar from "@/components/cart/Navbar";
import FoodList from "@/components/cart/FoodList";
import Sidebar from "@/components/cart/Sidebar";
import { useState, useEffect } from "react";

export default function ShoppingCart() {
  const [currentCustomer, setCurrentCustomer] = useState(true);
  const [cart, setCart] = useState([]);

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <FoodList cart={cart} setCart={setCart} />
      <Sidebar cart={cart} setCart={setCart} />
    </div>
  );
}
