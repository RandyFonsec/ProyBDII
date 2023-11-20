import styles from "../styles/signup.module.css";
import { useNavigate } from 'react-router-dom'

/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";

const LoginForm = ({name, value, onChange}) => {

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
    </div>
  )
}

const SelectForm = ({name, value, onChange}) => {

  return (
    <div className={styles['form-field']}>
      <label className={styles.label} htmlFor={name}>
        {name}
      </label>
      <select name="select" className={styles['login-field-error']} onChange={(e) => onChange(e.target.value)} value={value}>
        <option value={1} selected>Administrador</option>
        <option value={2}>Cliente</option>
    </select>
    </div>
  )
}



export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [fullname, setFullname] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [category, setCategory] = useState(1)

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()

    console.log(username, password, fullname, phone, email, category)
  
    await axios.post('http://localhost:3000/user/sign_up', {
      nickname: username, 
      password: password, 
      fullname: fullname, 
      phone: phone, 
      email: email, 
      userType: category 
    })
    .then(res => res.data)
    .catch(error => console.error(error))

    navigate('/')

  }

  return (
    <div className={styles['login-card']}>
      <form onSubmit={handleSubmit}>
        <span className={styles.title}>Sign Up</span>
        <LoginForm name={'fullname'} value={fullname}  onChange={setFullname}  />
        <LoginForm name={'username'} value={username} onChange={setUsername}  />
        <LoginForm name={'password'} value={password} onChange={setPassword}  />
        <LoginForm name={'phone'} value={phone} onChange={setPhone}  />
        <LoginForm name={'email'} value={email} onChange={setEmail}  />
        <SelectForm name={'category'} value={category} onChange={setCategory}  />
        <button className={styles["login-btn"]} type="submit">
          Registrarse
        </button>
        <button className={styles["login-btn-white"]} onClick={() => navigate('/')}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
