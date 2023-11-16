import styles from "@/styles/modals/modal.module.css";
import Image from "next/image";

export default function Modal({ isOpen, closeModal, title, children, handle }) {
  return (
    <>
      {isOpen && (
        <div className={styles.container}>
          <span className={styles.title}>{title}</span>
          <div className={styles.content}>
            <button className={styles["exit-btn"]} onClick={closeModal}>
              <Image
                src="/img/icons/cross.png"
                width={10}
                height={10}
                alt="Picture of the author"
              />
            </button>
            {children}
            <div className={styles["btn-module"]}>
              <button className={styles["cancel-btn"]} onClick={closeModal}>
                Cancelar
              </button>
              <button
                className={styles["accept-btn"]}
                type="submit"
                onClick={handle}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
