import React, {useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { useProduct } from '../context/ProductContext'
import { useCart } from '../context/CartContext'

export default function Details(){
  const navigate = useNavigate()
  const { selectedProduct } = useProduct()
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    if (selectedProduct) {
      console.log('Adding to cart:', selectedProduct)
      addToCart(selectedProduct)
      alert('Product added to cart!')
    } else {
      alert('No product selected')
    }
  }

  // If no product selected, show a message or redirect
  if (!selectedProduct) {
    return (
      <main className="main">
        <section className="breadcrumb">
          <ul className="breadcrumb__list flex container">
            <li><a href="index.html" className="breadcrumb__link">Home</a></li>
            <li><span className="breadcrumb__link">/</span></li>
            <li><span className="breadcrumb__link">Shop</span></li>
          </ul>
        </section>
        <div className="container" style={{ padding: '50px 0', textAlign: 'center' }}>
          <h2>Please select a product first</h2>
          <button onClick={() => navigate('/shop')} style={{ 
            padding: '10px 20px', 
            marginTop: '20px', 
            cursor: 'pointer',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}>
            Go to Shop
          </button>
        </div>
      </main>
    )
  }

  return (
    <>
      <main className="main">
        <section className="breadcrumb">
          <ul className="breadcrumb__list flex container">
            <li><a href="index.html" className="breadcrumb__link">Home</a></li>
            <li><span className="breadcrumb__link">/</span></li>
            <li><span className="breadcrumb__link">Fashion</span></li>
            <li><span className="breadcrumb__link">/</span></li>
            <li><span className="breadcrumb__link">Henley Shirt</span></li>
          </ul>
        </section>

      <section className="details section--lg">
        <div className="details__container container grid">
          <div className="details__group">
            <img
              src={selectedProduct.image1 || selectedProduct.image || './assets/img/product-8-1.jpg'}
              alt={selectedProduct.name || ''}
              className="details__img"
            />
            <div className="details__small-images grid">
              <img
                src={selectedProduct.image2 || selectedProduct.image || './assets/img/product-8-2.jpg'}
                alt={selectedProduct.name || ''}
                className="details__small-img"
              />
              <img
                src={selectedProduct.image1 || selectedProduct.image || './assets/img/product-8-1.jpg'}
                alt={selectedProduct.name || ''}
                className="details__small-img"
              />
              <img
                src={selectedProduct.image2 || selectedProduct.image || './assets/img/product-8-2.jpg'}
                alt={selectedProduct.name || ''}
                className="details__small-img"
              />
            </div>
          </div>
          <div className="details__group">
            <h3 className="details__title">{selectedProduct.name || 'Product Name'}</h3>
            <p className="details__brand">Brand: <span>{selectedProduct.brand || 'Brand'}</span></p>
            <div className="details__price flex">
              <span className="new__price">${selectedProduct.price || '0.00'}</span>
            </div>
            <p className="short__description">
              {selectedProduct.description || 'Premium quality product. Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
            </p>
            <ul className="products__list">
              <li className="list__item flex">
                <i className="fi-rs-crown"></i> 1 Year Al Jazeera Brand Warranty
              </li>
              <li className="list__item flex">
                <i className="fi-rs-refresh"></i> 30 Days Return Policy
              </li>
              <li className="list__item flex">
                <i className="fi-rs-credit-card"></i> Cash on Delivery available
              </li>
            </ul>
            <div className="details__color flex">
              <span className="details__color-title">Color</span>
              <ul className="color__list">
                <li>
                  <a
                    href="#"
                    className="color__link"
                    style={{backgroundColor: 'hsl(37, 100%, 65%)'}}
                  ></a>
                </li>
                <li>
                  <a
                    href="#"
                    className="color__link"
                    style={{backgroundColor: 'hsl(353, 100%, 65%)'}}
                  ></a>
                </li>
                <li>
                  <a
                    href="#"
                    className="color__link"
                    style={{backgroundColor: 'hsl(49, 100%, 60%)'}}
                  ></a>
                </li>
                <li>
                  <a
                    href="#"
                    className="color__link"
                    style={{backgroundColor: 'hsl(304, 100%, 78%)'}}
                  ></a>
                </li>
                <li>
                  <a
                    href="#"
                    className="color__link"
                    style={{backgroundColor: 'hsl(126, 61%, 52%)'}}
                  ></a>
                </li>
              </ul>
            </div>
            <div className="details__size flex">
              <span className="details__size-title">Size</span>
              <ul className="size__list">
                <li>
                  <a href="#" className="size__link size-active">M</a>
                </li>
                <li>
                  <a href="#" className="size__link">L</a>
                </li>
                <li>
                  <a href="#" className="size__link">XL</a>
                </li>
                <li>
                  <a href="#" className="size__link">XXL</a>
                </li>
              </ul>
            </div>
            <div className="details__action">
              <input type="number" className="quantity" defaultValue="1" min="1" />
              <button onClick={() => {
                console.log('Button clicked!')
                handleAddToCart()
              }} className="btn btn--sm">Add To Cart</button>
              <a href="#" className="details__action-btn">
                <i className="fi fi-rs-heart"></i>
              </a>
            </div>
            <ul className="details__meta">
              <li className="meta__list flex"><span>SKU:</span>{selectedProduct.sku || 'N/A'}</li>
              <li className="meta__list flex">
                <span>Tags:</span>{selectedProduct.tags || 'Clothes, Women, Dress'}
              </li>
              <li className="meta__list flex">
                <span>Availability:</span>{selectedProduct.stock || '8'} Items in Stock
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="details__tab container">
        <div className="detail__tabs">
          <span className="detail__tab active-tab" data-target="#info">
            Additional Info
          </span>
          <span className="detail__tab" data-target="#reviews">Reviews(3)</span>
        </div>
        <div className="details__tabs-content">
          <div className="details__tab-content active-tab" id="info">
            <table className="info__table">
              <tbody>
              <tr>
                <th>Stand Up</th>
                <td>35" L x 24"W x 37-45"H(front to back wheel)</td>
              </tr>
              <tr>
                <th>Folded (w/o wheels)</th>
                <td>32.5"L x 18.5"W x 16.5"H</td>
              </tr>
              <tr>
                <th>Folded (w/o wheels)</th>
                <td>32.5"L x 24"W x 18.5"H</td>
              </tr>
              <tr>
                <th>Door Pass THrough</th>
                <td>24</td>
              </tr>
              <tr>
                <th>Frame</th>
                <td>Aluminum</td>
              </tr>
              <tr>
                <th>Weight (w/o wheels)</th>
                <td>20 LBS</td>
              </tr>
              <tr>
                <th>Weight Capacity</th>
                <td>60 LBS</td>
              </tr>
              <tr>
                <th>Width</th>
                <td>24</td>
              </tr>
              <tr>
                <th>Handle Height (ground to handle)</th>
                <td>37-45</td>
              </tr>
              <tr>
                <th>Wheels</th>
                <td>12" air / wide track slick tread</td>
              </tr>
              <tr>
                <th>Seat back height</th>
                <td>21.5</td>
              </tr>
              <tr>
                <th>Head Room(inside canopy)</th>
                <td>25"</td>
              </tr>
              <tr>
                <th>Color</th>
                <td>Black, Blue, Red, White</td>
              </tr>
              <tr>
                <th>Size</th>
                <td>M, S</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="details__tab-content" id="reviews">
            <div className="reviews__container grid">
              <div className="review__single">
                <div>
                  <img
                    src="./assets/img/avatar-1.jpg"
                    alt=""
                    className="review__img"
                  />
                  <h4 className="review__title">Jacky Chan</h4>
                </div>
                <div className="review__data">
                  <div className="review__rating">
                    <i className="fi fi-rs-star"></i>
                    <i className="fi fi-rs-star"></i>
                    <i className="fi fi-rs-star"></i>
                    <i className="fi fi-rs-star"></i>
                    <i className="fi fi-rs-star"></i>
                  </div>
                  <p className="review__description">
                    Thank you, very fast shipping from Poland only 3days.
                  </p>
                  <span className="review__date">December 4, 2022 at 3:12 pm</span>
                </div>
              </div>
              <div className="review__single">
                <div>
                  <img
                    src="./assets/img/avatar-2.jpg"
                    alt=""
                    className="review__img"
                  />
                  <h4 className="review__title">Meriem Js</h4>
                </div>
                <div className="review__data">
                  <div className="review__rating">
                    <i className="fi fi-rs-star"></i>
                    <i className="fi fi-rs-star"></i>
                    <i className="fi fi-rs-star"></i>
                    <i className="fi fi-rs-star"></i>
                    <i className="fi fi-rs-star"></i>
                  </div>
                  <p className="review__description">
                    Great low price and works well
                  </p>
                  <span className="review__date">August 23, 2022 at 19:45 pm</span>
                </div>
              </div>
              <div className="review__single">
                <div>
                  <img
                    src="./assets/img/avatar-3.jpg"
                    alt=""
                    className="review__img"
                  />
                  <h4 className="review__title">Moh Benz</h4>
                </div>
                <div className="review__data">
                  <div className="review__rating">
                    <i className="fi fi-rs-star"></i>
                    <i className="fi fi-rs-star"></i>
                    <i className="fi fi-rs-star"></i>
                    <i className="fi fi-rs-star"></i>
                    <i className="fi fi-rs-star"></i>
                  </div>
                  <p className="review__description">
                    Authentic and beautiful, Love these ways more than ever
                    expected, They are great earphones.
                  </p>
                  <span className="review__date">March 2, 2021 at 10:01 am</span>
                </div>
              </div>
            </div>
            <div className="review__form">
              <h4 className="review__form-title">Add a review</h4>
              <div className="rate__product">
                <i className="fi fi-rs-star"></i>
                <i className="fi fi-rs-star"></i>
                <i className="fi fi-rs-star"></i>
                <i className="fi fi-rs-star"></i>
                <i className="fi fi-rs-star"></i>
              </div>
              <form className="form grid">
                <textarea
                  className="form__input textarea"
                  placeholder="Write Comment"
                ></textarea>
                <div className="form__group grid">
                  <input type="text" placeholder="Name" className="form__input" />
                  <input type="email" placeholder="Email" className="form__input" />
                </div>
                <div className="form__btn">
                  <button className="btn">Submit Review</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}
