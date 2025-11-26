import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { cartItems } = useCart()
  const { user, logout } = useAuth()
  const count = cartItems.reduce((s, i) => s + (i.quantity || 1), 0)
    return(
        <>
            <header className="header">
      <div className="header__top">
          <div className="header__container container">
          <div className="header__contact">
            <span>9988921546</span>
            <span>Sukhrattan Singh</span>
          </div>
          <p className="header__alert-news">
            Super Values Deals - Save more coupons
          </p>
          {user ? (
            <div style={{display:'flex',gap:12,alignItems:'center'}}>
              <span style={{fontWeight:600}}>Hi, {user.username}</span>
              <button className="header__top-btn" onClick={()=> logout()}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="header__top-btn">
              Log In / Sign Up
            </Link>
          )}
        </div>
      </div>

      <nav className="nav container">
        <a href="index.html" className="nav__logo">
          <img
            className="nav__logo-img"
            src="assets/img/logo.svg"
            alt="website logo"
          />
        </a>
        <div className="nav__menu" id="nav-menu">
          <div className="nav__menu-top">
            <a href="index.html" className="nav__menu-logo">
              <img src="./assets/img/logo.svg" alt="" />
            </a>
            <div className="nav__close" id="nav-close">
              <i className="fi fi-rs-cross-small"></i>
            </div>
          </div>
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/" className="nav__link">Home</Link>
            </li>
            <li className="nav__item">
              <Link to="/shop" className="nav__link">Shop</Link>
            </li>
            <li className="nav__item">
              <Link to="/accounts" className="nav__link">My Account</Link>
            </li>
            <li className="nav__item">
              <Link to="/compare" className="nav__link">Compare</Link>
            </li>
            <li className="nav__item">
              <Link to="/wishlist" className="nav__link">Wishlist</Link>
            </li>
          </ul>
          <div className="header__search">
            <input
              type="text"
              placeholder="Search For Items..."
              className="form__input"
            />
            <button className="search__btn">
              <img src="assets/img/search.png" alt="search icon" />
            </button>
          </div>
        </div>
        <div className="header__user-actions">
          
          <Link to="/cart" className="header__action-btn" title="Cart">
            <img src="assets/img/icon-cart.svg" alt="" />
            <span className="count">{count}</span>
          </Link>
          <div className="header__action-btn nav__toggle" id="nav-toggle">
            <img src="./assets/img/menu-burger.svg" alt="" />
          </div>
        </div>
      </nav>
    </header>
        </>
    )
}