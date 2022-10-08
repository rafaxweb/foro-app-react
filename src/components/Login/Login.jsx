import React, { useState } from 'react'
import { retrieveUserPassword } from '../../services/User/retrieveUserPassword';
import './Login.css'

export default function Login(props) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginCorrecto, setLoginCorrecto] = useState(true)

  function OnchangeUsername(e){
    setUsername(e.target.value);
  }

  function OnchangePassword(e){
    setPassword(e.target.value);
  }

  function OnCloseModal() {
    props.SetVisibilidad()
  }

  async function OnClickLogin(e){

    e.preventDefault();
    localStorage.clear();
    localStorage.setItem("username", username);

    const originalPassword = await retrieveUserPassword("usuario");
    if(String(password) === String(originalPassword)){
      localStorage.setItem("password", password);
      window.location.reload(false);
    }
    else{
      setLoginCorrecto(false);
    }
    
  }

  return (
    <form className='login' onSubmit={OnClickLogin}>
      <button className='login__close' onClick={OnCloseModal}>X</button>
      <div className='login__form-field'>
        <label className='login__form-field__label' htmlFor="username">Usuario</label>
        <input className='login__form-field__input' id='username' type='text' value={username} onChange={OnchangeUsername}></input>
      </div>
      <div className='login__form-field'>
        <label className='login__form-field__label' htmlFor="password">Contraseña</label>
        <input className='login__form-field__input' id='password' type='password' value={password} onChange={OnchangePassword}></input>
      </div>
      <input className='login__buttom' type='submit' onClick={OnClickLogin} value='Iniciar sesión'></input>
      {loginCorrecto ? '' : <p className='error-message'>Error en el login: Usuario o contraseña incorrecta</p>}
    </form>
  )
}
