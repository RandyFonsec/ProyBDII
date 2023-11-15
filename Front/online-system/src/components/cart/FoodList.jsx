import styles from "../../styles/cart/foodlist.module.css";
import data from '../../assets/food.json'
import image from '../../assets/undefined.png'

import { useEffect, useState } from "react";

const Details = ({ name, category, intern, extern }) => (
  <div className={styles["text-content"]}>
    <span className={styles.title}>{name}</span>
    <span className={styles.subtitle}>{category}</span>
    <span
      className={styles.title}
    >{`Interno: ₡${intern} Externo: ₡${extern}`}</span>
  </div>
);

const FoodItem = ({ item, cart, setCart }) => {
  return (
    <div className={styles["food-item"]}>
      <img  className={styles["food-img"]} src={image} alt="Logo" width={220} height={130} />
      <div className={styles["detail-summary"]}>
        <Details
          name={item.name}
          intern={item.intern}
          extern={item.extern}
          category={"Embutidos"}
        />
        <button onClick={() => setCart([...cart, item])}>Ordenar</button>
      </div>
    </div>
  );
};

export default function FoodList({ cart, setCart }) {
  const [foodList, setFoodList] = useState([]);



  useEffect(() => {
    setFoodList(data);
    console.log(data)
  }, []);

  return (
    <div className={styles.wrapper}>
      {foodList.map((item) => (
        <FoodItem key={item.id} item={item} cart={cart} setCart={setCart} />
      ))}
    </div>
  );
}
