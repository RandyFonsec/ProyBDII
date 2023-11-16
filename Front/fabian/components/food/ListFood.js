"use client";

import Image from "next/image";
import axios from "axios";
import styles from "@/styles/food/foodlist.module.css";
import { useEffect, useState } from "react";

const TextContent = ({ name, category }) => {
  return (
    <div className={styles["text-content"]}>
      <span className={styles.title}>{name}</span>
      <span className={styles.subtitle}>{category}</span>
    </div>
  );
};

const ImgButton = ({ imgName, handleBtn }) => (
  <button onClick={handleBtn}>
    <Image
      className={styles.img}
      src={`/img/icons/${imgName}.png`}
      width={15}
      height={15}
      alt=""
    />
  </button>
);

const ButtonRow = ({ openModal, deleteFood }) => (
  <div className={styles["btn-row"]}>
    {/*<ImgButton imgName={"like"} />*/}
    {/*<ImgButton imgName={"edit"} handleBtn={openModal}></ImgButton>*/}
    <ImgButton imgName={"trash"} handleBtn={deleteFood} />
  </div>
);

const FoodItem = ({ openModal, name, img, name_category, deleteFood }) => (
  <div className={styles.container}>
    <Image
      className={styles.img}
      src={`/img/food/${img}.png`}
      width={200}
      height={130}
      alt=""
    />
    <div className={styles.details}>
      <TextContent name={name} category={name_category} />
      <ButtonRow openModal={openModal} deleteFood={deleteFood} />
    </div>
  </div>
);

export default function ListFood({ openModal, setFoodCounter }) {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    fetch("/api/temp/food")
      .then((res) => res.json())
      .then((data) => setFoodList(data));

    setFoodCounter(foodList.length);
  }, [foodList]);

  const deleteFoo = (id) => {
    const food = {
      id: id,
    };

    axios.post(
      "http://localhost:3000/api/temp/foodDelete",
      JSON.stringify(food)
    );
  };

  return (
    <div className={styles["food-content"]}>
      {foodList.map((food) => (
        <FoodItem
          key={food.id}
          openModal={openModal}
          deleteFood={() => deleteFoo(food.id)}
          {...food}
        />
      ))}
    </div>
  );
}
