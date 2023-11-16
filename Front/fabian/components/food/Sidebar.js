"use client";

import styles from "@/styles/food/sidebar.module.css";

import { useEffect, useState } from "react";

import data from "../../data/categories.json";

const ListCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(data);
  }, []);

  return (
    <>
      <span className={styles.title}>Categorias</span>
      <>
        {categories.map(({ id, name }) => (
          <div key={id} className={styles["category-item"]}>
            <input className={styles.checkbox} type="checkbox" />
            <span>{name}</span>
          </div>
        ))}
      </>
    </>
  );
};

export default function Sidebar({ openModal }) {
  return (
    <aside className={styles.sidebar}>
      <button className={styles["add-btn"]} onClick={openModal}>
        Agregar un platillo
      </button>
      <ListCategories />
    </aside>
  );
}
