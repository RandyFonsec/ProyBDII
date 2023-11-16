"use client";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@/styles/cart/sidebar.module.css";

const Section = ({ title, children }) => (
  <div className={styles.section}>
    <span>{title}</span>
    {children}
  </div>
);

const Counter = () => {
  const [count, setCount] = useState(1);

  const reduce = () => {
    if (count > 1) {
      setCount((count) => count - 1);
    }
  };

  const ReduceCounter = () => (
    <button className={styles["counter-btn"]} onClick={reduce}>
      <Image src={`/img/icons/minus.png`} width={10} height={10} alt="" />
    </button>
  );

  const IncrementCounter = () => (
    <button
      className={styles["counter-btn"]}
      onClick={() => setCount((count) => count + 1)}
    >
      <Image src={`/img/icons/add.png`} width={10} height={10} alt="" />
    </button>
  );

  return (
    <div className={styles.counter}>
      <ReduceCounter />
      <span className={styles["counter-value"]}>{count}</span>
      <IncrementCounter />
    </div>
  );
};

const CartDetail = ({ name, intern, extern }) => (
  <div className={styles["cart-detail"]}>
    <span>{name}</span>
    <span className={styles.price}>{`Interno: ₡${intern}`}</span>
    <span className={styles.price}>{`Externo: ₡${extern}`}</span>
    {/*<Counter />*/}
  </div>
);

const CartItem = ({ id, name, img, intern, extern, cart, setCart }) => (
  <div className={styles["cart-item"]}>
    <Image
      className={styles["item-img"]}
      src={`/img/food/${img}.png`}
      width={95}
      height={95}
      alt=""
    />
    <CartDetail name={name} intern={intern} extern={extern} />
    <button
      className={styles["delete-btn"]}
      onClick={() => setCart(cart.filter((item) => item.id !== id))}
    >
      <Image src={`/img/icons/trash.png`} width={20} height={20} alt="" />
    </button>
  </div>
);

const CartList = ({ cartListItems, cart, setCart }) => {
  return (
    <Section title={"Orden actual"}>
      <div className={styles["cart-list"]}>
        {cartListItems.map(({ id, name, img, intern, extern }) => (
          <CartItem
            key={id}
            id={id}
            name={name}
            img={img}
            intern={intern}
            extern={extern}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>
    </Section>
  );
};

const CostumberSelector = ({ customer, setCustomer }) => (
  <Section title={"Información del cliente"}>
    <select
      name="select"
      value={customer}
      onChange={(e) => setCustomer(e.target.value)}
    >
      <option value={1}>Interno</option>
      <option value={2}>Externo</option>
    </select>
  </Section>
);

export default function Sidebar({ cart, setCart }) {
  const [totalIntern, setTotalIntern] = useState(0);
  const [totalExtern, setTotalExtern] = useState(0);
  const [customer, setCustomer] = useState(1);

  useEffect(() => {
    setTotalIntern(
      Number(
        cart
          .map((item) => item.intern)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      )
    );

    setTotalExtern(
      Number(
        cart
          .map((item) => item.extern)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      )
    );
  }, [totalIntern, totalExtern, cart]);

  const Total = () => (
    <Section title={"Detalle de compra"}>
      <div className={styles["detail-total"]}>
        <span>{"Total"}</span>
        <span className={styles.price}>{`Interno: ₡${totalIntern}`}</span>
        <span className={styles.price}>{`Externo: ₡${totalExtern}`}</span>
      </div>
      <button
        className={styles["pay-btn"]}
        onClick={() => {
          const total = customer === 1 ? totalIntern : totalExtern;

          axios.post(
            "http://localhost:3000/api/temp/log",
            JSON.stringify({
              id: uuidv4(),
              evento: "Cena",
              total: Number(total),
              fecha: new Date().toISOString(),
            })
          );
        }}
      >
        Cobrar
      </button>
    </Section>
  );

  return (
    <div className={styles.wrapper}>
      <CostumberSelector customer={customer} setCustomer={setCustomer} />
      <CartList cartListItems={cart} cart={cart} setCart={setCart} />
      <Total />
    </div>
  );
}
