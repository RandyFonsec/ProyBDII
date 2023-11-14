import styles from "../styles/log.module.css";
import {useState } from "react";

export default function Log() {
  const [log, setLog] = useState([]);

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>Registro de compras</span>
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
