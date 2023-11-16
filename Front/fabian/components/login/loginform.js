"use client";

import LoginField from "./loginfield";
import styles from "./loginform.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm(props) {
  const [isValidLogin, setIsValidLogin] = useState(true);
  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    fetch("/api/temp/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      user[0].username == formData.username &&
      user[0].password == formData.password
    ) {

      // if (login() == true && user.warehouseid == 2)
      router.push("/food", { scroll: false });
    } else if (
      user[1].username == formData.username &&
      user[1].password == formData.password
    ) {
      router.push("/cart", { scroll: false });
    } else {
      setIsValidLogin(false);
    }
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setIsValidLogin(true);
  };

  return (
    <div className={styles.item}>
      <form onSubmit={handleSubmit}>
        <span className={styles["main-msj"]}>Bienvenido de vuelta</span>
        <span className={styles["second-msj"]}>
          Por favor ingresa tus datos
        </span>
        <LoginField
          state={isValidLogin}
          field="username"
          name={"username"}
          placeholder="Ingrese su usuario"
          type="text"
          value={formData.username}
          method={handleInputChange}
        />
        <LoginField
          state={isValidLogin}
          field="password"
          name={"password"}
          type="password"
          value={formData.password}
          method={handleInputChange}
        />
        <button className={styles["login-btn"]} type="submit">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
