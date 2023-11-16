"use client";

import styles from "./login.module.css";

import { useState, useEffect } from "react";


const LoginForm = ({isValidAttempt, name, handler}) => {
  return (
    <div className={styles['form-field']}>
      <label className={styles.label} htmlFor={name}>
        {name}
      </label>
      <input
        className={styles['login-field-error']}
        type='text'
        placeholder={''}
        name={name}
        onChange={handler}
      />
      { isValidAttempt ? <span className={styles['error-msg-invalid']}>Usuario o contraseña invalido. Inténtalo de nuevo</span> : null }           
    </div>
  )
}

export default function Login() {
  const [isValidAttempt, setIsValidAttempt] = useState(false)

  return (
    <div className={styles['login-card']}>
      <form>
        <span className={styles.title}>Bienvenido de vuelta</span>
        <span className={styles.subtitle}>Por favor ingresa tus datos</span>
        <LoginForm isValidAttempt={isValidAttempt} name={'username'} handler={() => {}}  />
        <LoginForm isValidAttempt={isValidAttempt} name={'password'} handler={() => {}}  />
        <button className={styles["login-btn"]} type="submit">
          Iniciar sesión
      </button>
      </form>
    </div>
  );
}
