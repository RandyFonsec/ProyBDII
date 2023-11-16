"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import data from "../../data/food.json";
import datac from "../../data/categories.json";
import styles from "@/styles/events/sidebar.module.css";
import axios from "axios";

const Section = ({ title, children }) => (
  <div className={styles.section}>
    <span>{title}</span>
    {children}
  </div>
);

const CartDetail = ({ name, intern, extern }) => (
  <div className={styles["cart-detail"]}>
    <span className={styles.title}>{name}</span>
    <span className={styles.price}>{`Interno: ₡${intern}`}</span>
    <span className={styles.price}>{`Externo: ₡${extern}`}</span>
  </div>
);

const addEventTime = async (id, food) => {
  await axios.post(
    "http://localhost:3000/api/temp/events",
    JSON.stringify({
      id: id,
      food: food,
    })
  );
};

const CartItem = ({ food, currentCategory }) => (
  <div
    className={styles["cart-item"]}
    onClick={() => addEventTime(currentCategory, food)}
  >
    <Image
      className={styles["item-img"]}
      src={`/img/food/${food.img}.png`}
      width={95}
      height={95}
      alt=""
    />
    <CartDetail name={food.name} intern={food.intern} extern={food.extern} />
  </div>
);

const CartList = ({ items, currentCategory }) => (
  <Section title={"Platillos disponibles"}>
    <div className={styles["cart-list"]}>
      {items.map((food) => (
        <CartItem key={food.id} food={food} currentCategory={currentCategory} />
      ))}
    </div>
  </Section>
);

export default function Sidebar({ currentEvent }) {
  const [cartListItems, setCartList] = useState([]);

  useEffect(() => {
    setCartList(data);
  }, [cartListItems]);

  return (
    <div className={styles.wrapper}>
      <CartList items={cartListItems} currentCategory={currentEvent} />
    </div>
  );
}
