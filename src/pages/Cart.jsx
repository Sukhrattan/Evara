import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart(){
  const { cartItems, removeFromCart, updateQuantity } = useCart()
  const subtotal = cartItems.reduce((s,i)=> s + (parseFloat(i.price || 0) * (i.quantity || 1)), 0)
  const navigate = useNavigate()

  return (
  <>

<main className="main">
   
   

      
      <section className="cart section--lg container">
        <div class="table__container">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length === 0 ? (
                <tr><td colSpan={6} className="text-center">Your cart is empty</td></tr>
              ) : cartItems.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <img src={item.image || '/assets/img/product-1-2.jpg'} alt="" className="table__img" />
                  </td>
                  <td>
                    <h3 className="table__title">{item.name}</h3>
                    <p className="table__description">{item.category || ''}</p>
                  </td>
                  <td>
                    <span className="table__price">${item.price}</span>
                  </td>
                  <td>
                    <input type="number" className="quantity" value={item.quantity} min={1} onChange={(e)=> updateQuantity(item._key || item.name, parseInt(e.target.value || '1'))} />
                  </td>
                  <td>
                    <span className="subtotal">${(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                  </td>
                  <td>
                    <button className="btn" onClick={()=> removeFromCart(item._key || item.name)}><i className="fi fi-rs-trash table__trash" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cart__actions">
          <button className="btn flex btn__md" onClick={()=> navigate('/shop')}>
            <i className="fi-rs-shopping-bag"></i> Continue Shopping
          </button>
        </div>

        <div class="divider">
          <i class="fi fi-rs-fingerprint"></i>
        </div>

        <div class="cart__group grid">
          <div>
            <div class="cart__shippinp">
              <h3 class="section__title">Calculate Shipping</h3>
              <form action="" class="form grid">
                <input
                  type="text"
                  class="form__input"
                  placeholder="State / Country"
                />
                <div class="form__group grid">
                  <input type="text" class="form__input" placeholder="City" />
                  <input
                    type="text"
                    class="form__input"
                    placeholder="PostCode"
                  />
                </div>
                <div class="form__btn">
                  <button class="btn flex btn--sm">
                    <i class="fi-rs-shuffle"></i> Update
                  </button>
                </div>
              </form>
            </div>
            <div class="cart__coupon">
              <h3 class="section__title">Apply Coupon</h3>
              <form action="" class="coupon__form form grid">
                <div class="form__group grid">
                  <input
                    type="text"
                    class="form__input"
                    placeholder="Enter Your Coupon"
                  />
                  <div class="form__btn">
                    <button class="btn flex btn--sm">
                      <i class="fi-rs-label"></i> Aplly
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="cart__total">
            <h3 class="section__title">Cart Totals</h3>
            <table className="cart__total-table">
                <tbody>
                <tr>
                  <td><span className="cart__total-title">Cart Subtotal</span></td>
                  <td><span className="cart__total-price">${subtotal.toFixed(2)}</span></td>
                </tr>
                <tr>
                  <td><span className="cart__total-title">Shipping</span></td>
                  <td><span className="cart__total-price">$10.00</span></td>
                </tr>
                <tr>
                  <td><span className="cart__total-title">Total</span></td>
                  <td><span className="cart__total-price">${(subtotal + 10).toFixed(2)}</span></td>
                </tr>
                </tbody>
            </table>
            <a href="/checkout" className="btn flex btn--md">
              <i className="fi fi-rs-box-alt"></i> Proceed To Checkout
            </a>
          </div>
        </div>
      </section>

     
      <section class="newsletter section">
        <div class="newsletter__container container grid">
          <h3 class="newsletter__title flex">
            <img
              src="./assets/img/icon-email.svg"
              alt=""
              class="newsletter__icon"
            />
            Sign in to Newsletter
          </h3>
          <p class="newsletter__description">
            ...and receive $25 coupon for first shopping.
          </p>
          <form action="" class="newsletter__form">
            <input
              type="text"
              placeholder="Enter Your Email"
              class="newsletter__input"
            />
            <button type="submit" class="newsletter__btn">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
    </>
    )
}
