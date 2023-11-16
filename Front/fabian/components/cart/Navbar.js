"use client";

import Image from "next/image";
import styles from "@/styles/cart/navbar.module.css";
import data from "../../data/categories.json";
import { useEffect, useState } from "react";

const FilterList = ({ categories }) => (
  <div className={styles["category-filter"]}>
    {categories.map(({ id, name }) => (
      <div className={styles.category} key={id}>
        {name}
      </div>
    ))}
  </div>
);

export default function Navbar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(data);
  });
  return (
    <>
      <div className={styles["top-bar"]}>
        <span className={styles.title}>Eventos del día</span>
        {/*<input
          className={styles["search-bar"]}
          placeholder="Encuentra platillos y bebidas"
        />
        <Image
          className={styles["search-icon"]}
          src={`/img/icons/hand-lens.png`}
          width={25}
          height={25}
          alt=""
  />*/}
      </div>
      {/*<FilterList categories={categories} />*/}
    </>
  );
}
