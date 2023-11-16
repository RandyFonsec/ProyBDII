'use client'

import styles from './loginfield.module.css'
import React, { useState } from 'react';

export default function LoginField(props) {  
  if (props.state) {
    return (
      <>
        <label className={styles.label} htmlFor={props.field}>
          {props.name}
        </label>
        <input
          className={styles['login-field']}
          type={props.type}
          placeholder={props.placeholder}
          name={props.field}
          value={props.value}
          onChange={props.method}
        />
        <span className={styles['error-msg-valid']}>Usuario o contraseña invalido. Inténtalo de nuevo</span>
      </>
    ); 
  } else {
    return (
      <>
        <label className={styles.label} htmlFor={props.field}>
          {props.name}
        </label>
        <input
          className={styles['login-field-error']}
          type={props.type}
          placeholder={props.placeholder}
          name={props.field}
          onChange={props.method}
        />
        <span className={styles['error-msg-invalid']}>Usuario o contraseña invalido. Inténtalo de nuevo</span>
      </>
    );
  }
}