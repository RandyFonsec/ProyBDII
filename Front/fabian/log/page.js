"use client";

import Image from "next/image";
import styles from "@/styles/log/log.module.css";
import data from "../data/log.json";
import { useEffect, useState } from "react";

const BtnFilter = ({ title, img, method }) => (
  <button className={styles["btn-filter"]} onClick={method}>
    <span>{title}</span>
    <Image
      className={styles["food-img"]}
      src={`/img/icons/${img}.png`}
      width={20}
      height={20}
      alt=""
    />
  </button>
);

const Filter = () => (
  <div className={styles.filter}>
    <BtnFilter title={"Ultimas compras"} img={"down"} />
    <Image
      className={styles["filter-icon"]}
      src={`/img/icons/hand-lens.png`}
      width={20}
      height={20}
      alt=""
    />
    <input className={styles["filter-input"]} placeholder="Buscar" />
  </div>
);

export default function Log() {
  const [log, setLog] = useState([]);

  useEffect(() => {
    setLog(data);
  }, []);

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>Registro de compras</span>
      {/*<Filter />*/}
      <table className={styles["log-table"]}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Evento</th>
            <th>Total</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {log.map(({ id, evento, total, fecha }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{evento}</td>
              <td>{`₡ ${total}`}</td>
              <td>{fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
