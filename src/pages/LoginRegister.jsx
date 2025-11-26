import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function LoginRegister(){
  const { login, register } = useAuth()
  const navigate = useNavigate()

  // login state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState(null)

  // register state
  const [regUsername, setRegUsername] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirm, setRegConfirm] = useState('')
  const [regError, setRegError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError(null)
    try{
      await login({ email: loginEmail, password: loginPassword })
      navigate('/')
    }catch(err){
      setLoginError(err.message || 'Login failed')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setRegError(null)
    if(regPassword !== regConfirm){
      setRegError('Passwords do not match')
      return
    }
    try{
      await register({ username: regUsername, email: regEmail, password: regPassword })
      navigate('/')
    }catch(err){
      setRegError(err.message || 'Registration failed')
    }
  }

  return(
    <main className="main">
      <section className="breadcrumb">
        <ul className="breadcrumb__list flex container">
          <li><a href="/" className="breadcrumb__link">Home</a></li>
          <li><span className="breadcrumb__link"></span></li>
          <li><span className="breadcrumb__link">Login / Register</span></li>
        </ul>
      </section>

      <section className="login-register section--lg">
        <div className="login-register__container container grid">
          <div className="login">
            <h3 className="section__title">Login</h3>
            <form className="form grid" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Your Email"
                className="form__input"
                value={loginEmail}
                onChange={(e)=>setLoginEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Your Password"
                className="form__input"
                value={loginPassword}
                onChange={(e)=>setLoginPassword(e.target.value)}
              />
              {loginError && <div style={{color:'red'}}>{loginError}</div>}
              <div className="form__btn">
                <button className="btn" type="submit">Login</button>
              </div>
            </form>
          </div>
          <div className="register">
            <h3 className="section__title">Create an Account</h3>
            <form className="form grid" onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Username"
                className="form__input"
                value={regUsername}
                onChange={(e)=>setRegUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Your Email"
                className="form__input"
                value={regEmail}
                onChange={(e)=>setRegEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Your Password"
                className="form__input"
                value={regPassword}
                onChange={(e)=>setRegPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="form__input"
                value={regConfirm}
                onChange={(e)=>setRegConfirm(e.target.value)}
              />
              {regError && <div style={{color:'red'}}>{regError}</div>}
              <div className="form__btn">
                <button className="btn" type="submit">Submit & Register</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="newsletter section">
        <div className="newsletter__container container grid">
          <h3 className="newsletter__title flex">
            <img
              src="./assets/img/icon-email.svg"
              alt=""
              className="newsletter__icon"
            />
            Sign in to Newsletter
          </h3>
          <p className="newsletter__description">
            ...and receive $25 coupon for first shopping.
          </p>
          <form action="" className="newsletter__form">
            <input
              type="text"
              placeholder="Enter Your Email"
              className="newsletter__input"
            />
            <button type="submit" className="newsletter__btn">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  )
}