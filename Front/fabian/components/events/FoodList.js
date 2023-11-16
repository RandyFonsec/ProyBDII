"use client";

import Image from "next/image";
import styles from "@/styles/events/foodlist.module.css";
import data from "../../data/events.json";
import { useEffect, useState } from "react";

const PriceModule = ({ intern = 0, extern = 0 }) => (
  <div className={styles["price-module"]}>
    <span className={styles["intern-title"]}>{`Interno: ₡${intern}`}</span>
    <span className={styles["extern-title"]}>{`Externo: ₡${extern}`}</span>
  </div>
);

const Details = ({ name, nameCategory, intern, extern }) => (
  <div className={styles["text-content"]}>
    <span className={styles.title}>{name}</span>
    <span className={styles.subtitle}>{nameCategory}</span>
    <PriceModule intern={intern} extern={extern} />
  </div>
);

const FoodItem = ({ food }) => (
  <div className={styles["food-item"]}>
    <Image
      className={styles["food-img"]}
      src={`/img/food/${food.img}.png`}
      width={220}
      height={130}
      alt=""
    />
    <Details
      name={food.name}
      nameCategory={food.name_category}
      intern={food.intern}
      extern={food.extern}
    />
  </div>
);

export default function FoodList({ currentEvent }) {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    setFoodList(data.find((event) => event.id === currentEvent)?.food || []);
  }, [foodList, currentEvent]);

  return (
    <div className={styles.wrapper}>
      {foodList.map((food) => (
        <FoodItem food={food} />
      ))}
    </div>
  );
}
