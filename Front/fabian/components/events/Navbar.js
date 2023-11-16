"use client";

import Image from "next/image";
import styles from "@/styles/events/navbar.module.css";
import data from "../../data/events.json";
import { useEffect, useState } from "react";

const FilterList = ({ events, setCurrentEvent }) => (
  <div className={styles["category-filter"]}>
    {events.map(({ id, event }) => (
      <div
        className={styles.category}
        key={id}
        onClick={() => setCurrentEvent(id)}
      >
        {event}
      </div>
    ))}
  </div>
);

export default function Navbar({ setCurrentEvent }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(data);
  });
  return (
    <>
      <div className={styles["top-bar"]}>
        <span className={styles.title}>Platillos disponibles</span>
        <input
          className={styles["search-bar"]}
          placeholder="Encuentra platillos y bebidas"
        />
        <Image
          className={styles["search-icon"]}
          src={`/img/icons/hand-lens.png`}
          width={25}
          height={25}
          alt=""
        />
      </div>
      <FilterList events={events} setCurrentEvent={setCurrentEvent} />
    </>
  );
}
