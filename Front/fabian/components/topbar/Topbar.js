import { useRouter } from "next/navigation";

import styles from "@/styles/topbar/topbar.module.css";

export default function TopBar() {
  const router = useRouter();

  return (
    <>
      <div className={styles.wrapper}>
        <div onClick={() => router.push("/food")}>Platillos</div>
        <div onClick={() => router.push("/events")}>Eventos</div>
        <div onClick={() => router.push("/log")}>Historial</div>
        <div onClick={() => router.push("/users")}>Usuarios</div>
        <div onClick={() => router.push("/cart")}>Carrito</div>
        <div onClick={() => router.push("/login")}>Salir</div>
      </div>
    </>
  );
}
