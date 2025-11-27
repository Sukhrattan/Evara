import React from 'react'
import { useCart } from '../context/CartContext'

export default function Checkout(){
  const { cartItems } = useCart()
  
  const subtotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price || 0) * (item.quantity || 1)), 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <>
      <main className="main">

      <section className="breadcrumb">
        <ul className="breadcrumb__list flex container">
          <li><a href="/" className="breadcrumb__link">Home</a></li>
          <li><span className="breadcrumb__link">&gt;</span></li>
          <li><span className="breadcrumb__link">Shop</span></li>
          <li><span className="breadcrumb__link">&gt;</span></li>
          <li><span className="breadcrumb__link">Checkout</span></li>
        </ul>
      </section>


      <section className="checkout section--lg">
        <div className="checkout__container container grid">
          <div className="checkout__group">
            <h3 className="section__title">Billing Details</h3>
            <form className="form grid">
              <input type="text" placeholder="Name" className="form__input" />
              <input type="text" placeholder="Address" className="form__input" />
              <input type="text" placeholder="City" className="form__input" />
              <input type="text" placeholder="Country" className="form__input" />
              <input type="text" placeholder="Postcode" className="form__input" />
              <input type="text" placeholder="Phone" className="form__input" />
              <input type="email" placeholder="Email" className="form__input" />
              <h3 className="checkout__title">Additional Information</h3>
              <textarea
                name=""
                placeholder="order note"
                className="form__input textarea"
              ></textarea>
            </form>
          </div>
          <div className="checkout__group">
            <h3 className="section__title">Cart Totals</h3>
            <table className="order__table">
              <thead>
                <tr>
                  <th colSpan={2}>Products</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {cartItems.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', padding: '20px' }}>
                      Your cart is empty
                    </td>
                  </tr>
                ) : (
                  cartItems.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <img
                          src={item.image || './assets/img/product-1-2.jpg'}
                          alt={item.name}
                          className="order__img"
                        />
                      </td>
                      <td>
                        <h3 className="table__title">{item.name}</h3>
                        <p className="table__quantity">x {item.quantity}</p>
                      </td>
                      <td><span className="table__price">${(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}</span></td>
                    </tr>
                  ))
                )}
                <tr>
                  <td><span className="order__subtitle">Subtotal</span></td>
                  <td colSpan={2}><span className="table__price">${subtotal.toFixed(2)}</span></td>
                </tr>
                <tr>
                  <td><span className="order__subtitle">Shipping</span></td>
                  <td colSpan={2}>
                    <span className="table__price">{shipping === 0 ? 'Free Shipping' : `$${shipping.toFixed(2)}`}</span>
                  </td>
                </tr>
                <tr>
                  <td><span className="order__subtitle">Tax</span></td>
                  <td colSpan={2}>
                    <span className="table__price">${tax.toFixed(2)}</span>
                  </td>
                </tr>
                <tr>
                  <td><span className="order__subtitle">Total</span></td>
                  <td colSpan={2}>
                    <span className="order__grand-total">${total.toFixed(2)}</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="payment__methods">
              <h3 className="checkout__title payment__title">Payment</h3>
              <div className="payment__option flex">
                <input
                  type="radio"
                  name="radio"
                  id="l1"
                  defaultChecked
                  className="payment__input"
                />
                <label htmlFor="l1" className="payment__label">Direct Bank Transfer</label>
              </div>
              <div className="payment__option flex">
                <input
                  type="radio"
                  name="radio"
                  id="l2"
                  className="payment__input"
                />
                <label htmlFor="l2" className="payment__label">Check Payment</label>
              </div>
              <div className="payment__option flex">
                <input
                  type="radio"
                  name="radio"
                  id="l3"
                  className="payment__input"
                />
                <label htmlFor="l3" className="payment__label">Paypal</label>
              </div>
            </div>
            <button className="btn btn--md">Place Order</button>
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

    <footer className="footer container">
      <div className="footer__container grid">
        <div className="footer__content">
          <a href="index.html" className="footer__logo">
            <img src="./assets/img/logo.svg" alt="" className="footer__logo-img" />
          </a>
          <h4 className="footer__subtitle">Contact</h4>
          <p className="footer__description">
            <span>Address:</span> 13 Tlemcen Road, Street 32, Beb-Wahren
          </p>
          <p className="footer__description">
            <span>Phone:</span> +01 2222 365 /(+91) 01 2345 6789
          </p>
          <p className="footer__description">
            <span>Hours:</span> 10:00 - 18:00, Mon - Sat
          </p>
          <div className="footer__social">
            <h4 className="footer__subtitle">Follow Me</h4>
            <div className="footer__links flex">
              <a href="#">
                <img
                  src="./assets/img/icon-facebook.svg"
                  alt=""
                  className="footer__social-icon"
                />
              </a>
              <a href="#">
                <img
                  src="./assets/img/icon-twitter.svg"
                  alt=""
                  className="footer__social-icon"
                />
              </a>
              <a href="#">
                <img
                  src="./assets/img/icon-instagram.svg"
                  alt=""
                  className="footer__social-icon"
                />
              </a>
              <a href="#">
                <img
                  src="./assets/img/icon-pinterest.svg"
                  alt=""
                  className="footer__social-icon"
                />
              </a>
              <a href="#">
                <img
                  src="./assets/img/icon-youtube.svg"
                  alt=""
                  className="footer__social-icon"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}
