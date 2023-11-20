import styles from "../styles/login.module.css";
import { useNavigate, Link } from 'react-router-dom'

/* eslint-disable react/prop-types */

import axios from "axios";
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

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
  
    const data = await axios.post('http://localhost:3000/user/auth', {
      username: username,
      password: password
    })
    .then(res => res.data)
    .catch(error => console.error(error))

    setIsValidAttempt(data.status !== 200)

    if (data.status === 200) {
      if (data.id === 1)
        navigate('/admin')
      else
        navigate('/client')
    }

    console.log(data)
  }

  return (
    <div className={styles['login-card']}>
      <form onSubmit={handleSubmit}>
        <span className={styles.title}>Welcome back!!</span>
        <span className={styles.subtitle}>Please enter your data</span>
        <LoginForm isValidAttempt={isValidAttempt} name={'username'} value={username}  onChange={setUsername}  />
        <LoginForm isValidAttempt={isValidAttempt} name={'password'} value={password} onChange={setPassword}  />
        <button className={styles["login-btn"]} type="submit">
          Iniciar sesión
      </button>
      <Link to='/sign_up' style={{textAlign: "center"}}>Register through this link</Link>
      </form>
    </div>
  );
}
