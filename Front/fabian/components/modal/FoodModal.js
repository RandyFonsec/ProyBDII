"use client";

import Modal from "./Modal";
import styles from "@/styles/modals/fooadd.module.css";

const categories = [
  { id: 1, name: "Bebidas Calientes" },
  { id: 2, name: "Frescos" },
  { id: 3, name: "Frutas" },
  { id: 4, name: "Gallo Pinto" },
  { id: 5, name: "Huevo" },
  { id: 6, name: "Proteicos" },
  { id: 7, name: "Acompañamientos Desayuno" },
  { id: 8, name: "Arroz y Frijoles" },
  { id: 9, name: "Platos Principales de Carne" },
  { id: 10, name: "Platos Principales de Pollo" },
  { id: 11, name: "Platos Principales de Pescado y Mariscos" },
  { id: 12, name: "Platos Principales de Pescado y Mariscos" },
  { id: 13, name: "Platos Principales Vegetarianos" },
  { id: 14, name: "Ensaladas" },
  { id: 15, name: "Guarniciones" },
  { id: 16, name: "Emparedados" },
  { id: 17, name: "Café de la Tarde" },
];

export default function FoodModal({ title, isOpen, setIsOpen }) {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
      <div className={styles["field-group"]}>
        <div className={styles.field}>
          <label>Nombre</label>
          <input />
        </div>
        <div className={styles.field}>
          <label>Nombre</label>
          <input />
        </div>
        <div className={styles.field}>
          <label>Categoría</label>
          <select id="cars">
            {categories.map(({ id, name }) => {
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <input
        className={styles.input}
        type="file"
        accept="image/png, image/jpeg"
      />
    </Modal>
  );
}
