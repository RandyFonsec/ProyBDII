import styles from "../styles/login.module.css";

import { useState } from "react";

const LoginForm = ({isValidAttempt, name, value, onChange}) => {
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      { isValidAttempt ? <span className={styles['error-msg-invalid']}>Usuario o contraseña invalido. Inténtalo de nuevo</span> : null }           
    </div>
  )
}

export default function Login() {
  const [isValidAttempt, setIsValidAttempt] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (false) {
      setIsValidAttempt(false)
    } else {
      setIsValidAttempt(true)
    }
  }

  return (
    <div className={styles['login-card']}>
      <form onSubmit={handleSubmit}>
        <span className={styles.title}>Bienvenido de vuelta</span>
        <span className={styles.subtitle}>Por favor ingresa tus datos</span>
        <LoginForm isValidAttempt={isValidAttempt} name={'username'} value={username}  onChange={setUsername}  />
        <LoginForm isValidAttempt={isValidAttempt} name={'password'} value={password} onChange={setPassword}  />
        <button className={styles["login-btn"]} type="submit">
          Iniciar sesión
      </button>
      </form>
    </div>
  );
}
