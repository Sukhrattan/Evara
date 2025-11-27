import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useProduct } from '../context/ProductContext'

export default function Home(){
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { setSelectedProduct } = useProduct()

  const handleQuickView = (e, product) => {
    e.preventDefault();
    console.log('Quick view', product);
  }

  const handleAddToWishlist = (e, product) => {
    e.preventDefault();
    console.log('Add to wishlist', product);
  }

  const handleCompare = (e, product) => {
    e.preventDefault();
    console.log('Add to compare', product);
  }

  useEffect(()=>{
    const onClick = (ev)=>{
      const btn = ev.target.closest && ev.target.closest('.cart__btn')
      if(!btn) return
      ev.preventDefault()
      const productEl = btn.closest('.product__item')
      if(!productEl) return
      const nameEl = productEl.querySelector('.product__title')
      const priceEl = productEl.querySelector('.new__price') || productEl.querySelector('.product__price .new__price')
      const imgEl = productEl.querySelector('.product__img.default') || productEl.querySelector('img')
      const product = {
        name: nameEl ? nameEl.textContent.trim() : 'Product',
        price: priceEl ? priceEl.textContent.replace('$','').trim() : '0',
        image: imgEl ? imgEl.getAttribute('src') : ''
      }
      addToCart(product)
    }
    document.addEventListener('click', onClick)
    return ()=> document.removeEventListener('click', onClick)
  }, [addToCart])

  // Handle product image/title clicks for details page
  useEffect(()=>{
    const handleProductClick = (ev)=>{
      const link = ev.target.closest && ev.target.closest('a[href="/details"]')
      if(!link) return
      
      ev.preventDefault()
      ev.stopPropagation()
      
      const productEl = link.closest('.product__item')
      if(!productEl) return
      
      const nameEl = productEl.querySelector('.product__title')
      const priceEl = productEl.querySelector('.new__price') || productEl.querySelector('.product__price .new__price')
      const imageEl = productEl.querySelector('.product__img.default') || productEl.querySelector('img')
      const categoryEl = productEl.querySelector('.product__category')
      const hoverImageEl = productEl.querySelector('.product__img.hover')
      
      const product = {
        name: nameEl ? nameEl.textContent.trim() : 'Product',
        price: priceEl ? priceEl.textContent.replace('$','').trim() : '0',
        image: imageEl ? imageEl.getAttribute('src') : '',
        image1: imageEl ? imageEl.getAttribute('src') : '',
        image2: hoverImageEl ? hoverImageEl.getAttribute('src') : (imageEl ? imageEl.getAttribute('src') : ''),
        category: categoryEl ? categoryEl.textContent.trim() : 'Clothing',
        brand: 'Brand',
        description: 'Premium quality product',
        rating: 5,
        stock: 8,
        sku: 'SKU-001',
        tags: 'Clothing, Fashion'
      }
      
      setSelectedProduct(product)
      navigate('/details')
    }
    
    document.addEventListener('click', handleProductClick)
    return ()=> document.removeEventListener('click', handleProductClick)
  }, [setSelectedProduct, navigate])
  useEffect(()=>{
    // Init swiper carousels
    function initSwipers(){
      try{
        if(window.Swiper){
          if(document.querySelector('.categories__container') && !window._categoriesInitialized){
            new Swiper('.categories__container', {
              spaceBetween: 24,
              loop: true,
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              breakpoints: {
                350: { slidesPerView: 2, spaceBetween: 24 },
                768: { slidesPerView: 3, spaceBetween: 24 },
                992: { slidesPerView: 4, spaceBetween: 24 },
                1200: { slidesPerView: 5, spaceBetween: 24 },
                1400: { slidesPerView: 6, spaceBetween: 24 },
              }
            })
            window._categoriesInitialized = true
          }

          if(document.querySelector('.new__container') && !window._productsInitialized){
            new Swiper('.new__container', {
              spaceBetween: 24,
              loop: true,
              navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
              breakpoints: { 768: { slidesPerView: 2 }, 992: { slidesPerView: 4 }, 1400: { slidesPerView: 4 } }
            })
            window._productsInitialized = true
          }
        }
      }catch(e){
        console.warn('Swiper init failed', e)
      }
    }

    if(!document.getElementById('evara-swiper')){
      const s = document.createElement('script')
      s.id = 'evara-swiper'
      s.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'
      s.onload = initSwipers
      document.body.appendChild(s)
    } else {
      initSwipers()
    }
  }, [])

  useEffect(() => {
    // Handle tab switching
    const tabs = document.querySelectorAll('[data-target]')
    const tabsContents = document.querySelectorAll('[content]')

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)

        tabsContents.forEach((tc) => {
          tc.classList.remove('active-tab')
        })

        target.classList.add('active-tab')

        tabs.forEach((t) => {
          t.classList.remove('active-tab')
        })

        tab.classList.add('active-tab')
      })
    })
  }, []) // Run once on mount

  return(
    <>
      <main className="main">
     
      <section className="home section--lg">
        <div className="home__container container grid">
          <div className="home__content">
            <span className="home__subtitle">Hot Promotions</span>
            <h1 className="home__title">
              Fashion Trending <span>Great Collection</span>
            </h1>
            <p className="home__description">
              Save more with coupons & up tp 20% off
            </p>
            <a href="shop.html" className="btn">Shop Now</a>
          </div>
          <img src="assets/img/home-img.png" className="home__img" alt="hats" />
        </div>
      </section>

      =
      <section className="categories container section">
        <h3 className="section__title"><span>Popular</span> Categories</h3>
        <div className="categories__container swiper">
          <div className="swiper-wrapper">
            <a href="shop.html" className="category__item swiper-slide">
              <img
                src="assets/img/category-1.jpg"
                alt=""
                className="category__img"
              />
              <h3 className="category__title">T-Shirt</h3>
            </a>
            <a href="shop.html" className="category__item swiper-slide">
              <img
                src="assets/img/category-2.jpg"
                alt=""
                className="category__img"
              />
              <h3 className="category__title">Bags</h3>
            </a>
            <a href="shop.html" className="category__item swiper-slide">
              <img
                src="assets/img/category-3.jpg"
                alt=""
                className="category__img"
              />
              <h3 className="category__title">Sandal</h3>
            </a>
            <a href="shop.html" className="category__item swiper-slide">
              <img
                src="assets/img/category-4.jpg"
                alt=""
                className="category__img"
              />
              <h3 className="category__title">Scarf Cap</h3>
            </a>
            <a href="shop.html" className="category__item swiper-slide">
              <img
                src="assets/img/category-5.jpg"
                alt=""
                className="category__img"
              />
              <h3 className="category__title">Shoes</h3>
            </a>
            <a href="shop.html" className="category__item swiper-slide">
              <img
                src="assets/img/category-6.jpg"
                alt=""
                className="category__img"
              />
              <h3 className="category__title">Pillowcase</h3>
            </a>
            <a href="shop.html" className="category__item swiper-slide">
              <img
                src="assets/img/category-7.jpg"
                alt=""
                className="category__img"
              />
              <h3 className="category__title">Jumpsuit</h3>
            </a>
            <a href="shop.html" className="category__item swiper-slide">
              <img
                src="assets/img/category-8.jpg"
                alt=""
                className="category__img"
              />
              <h3 className="category__title">Hats</h3>
            </a>
          </div>

          <div className="swiper-button-prev">
            <i className="fi fi-rs-angle-left"></i>
          </div>
          <div className="swiper-button-next">
            <i className="fi fi-rs-angle-right"></i>
          </div>
        </div>
      </section>

     
      <section className="products container section">
        <div className="tab__btns">
          <span className="tab__btn active-tab" data-target="#featured"
            >Featured</span
          >
          <span className="tab__btn" data-target="#popular">Popular</span>
          <span className="tab__btn" data-target="#new-added">New Added</span>
        </div>

        <div className="tab__items">
          <div className="tab__item active-tab" content id="featured">
            <div className="products__container grid">
              <div className="product__item">
                <div className="product__banner">
                  <a href="/details" className="product__images">
                    <img
                      src="assets/img/product-1-1.jpg"
                      alt=""
                      className="product__img default"
                    />
                    <img
                      src="assets/img/product-1-2.jpg"
                      alt=""
                      className="product__img hover"
                    />
                  </a>
                  <div className="product__actions">
                    <a href="#" 
                      className="action__btn" 
                      aria-label="Quick View"
                      onClick={(e) => handleQuickView(e, {
                        name: "Colorful Pattern Shirts",
                        price: "238.85",
                        category: "Clothing"
                      })}
                    >
                      <i className="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      className="action__btn"
                      aria-label="Add to Wishlist"
                      onClick={(e) => handleAddToWishlist(e, {
                        name: "Colorful Pattern Shirts",
                        price: "238.85",
                        category: "Clothing"
                      })}
                    >
                      <i className="fi fi-rs-heart"></i>
                    </a>
                    <a 
                      href="#" 
                      className="action__btn" 
                      aria-label="Compare"
                      onClick={(e) => handleCompare(e, {
                        name: "Colorful Pattern Shirts",
                        price: "238.85",
                        category: "Clothing"
                      })}
                    >
                      <i className="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div className="product__badge light-pink">Hot</div>
                </div>
                <div className="product__content">
                  <span className="product__category">Clothing</span>
                  <a href="/details">
                    <h3 className="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-2-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-2-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-green">Hot</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-3-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-3-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-orange">Hot</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-4-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-4-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-blue">Hot</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-5-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-5-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-blue">-30%</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-6-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-6-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-blue">-22%</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-7-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-7-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-green">-22%</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-8-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-8-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="tab__item" content id="popular">
            <div class="products__container grid">
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-9-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-9-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-pink">Hot</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-2-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-2-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-green">Hot</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-10-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-10-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-orange">Hot</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-4-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-4-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-blue">Hot</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-5-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-5-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-blue">-30%</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-11-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-11-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-blue">-22%</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-7-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-7-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-green">-22%</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-8-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-8-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="tab__item" content id="new-added">
            <div class="products__container grid">
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-1-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-1-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-pink">Hot</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-12-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-12-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-green">Hot</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-13-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-13-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-orange">Hot</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-4-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-4-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-blue">Hot</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-10-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-10-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-blue">-30%</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-6-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-6-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-blue">-22%</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-9-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-9-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                  <div class="product__badge light-green">-22%</div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
              <div class="product__item">
                <div class="product__banner">
                  <a href="/details" class="product__images">
                    <img
                      src="assets/img/product-8-1.jpg"
                      alt=""
                      class="product__img default"
                    />
                    <img
                      src="assets/img/product-8-2.jpg"
                      alt=""
                      class="product__img hover"
                    />
                  </a>
                  <div class="product__actions">
                    <a href="#" class="action__btn" aria-label="Quick View">
                      <i class="fi fi-rs-eye"></i>
                    </a>
                    <a
                      href="#"
                      class="action__btn"
                      aria-label="Add to Wishlist"
                    >
                      <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action__btn" aria-label="Compare">
                      <i class="fi fi-rs-shuffle"></i>
                    </a>
                  </div>
                </div>
                <div class="product__content">
                  <span class="product__category">Clothing</span>
                  <a href="/details">
                    <h3 class="product__title">Colorful Pattern Shirts</h3>
                  </a>
                  <div class="product__rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                  </div>
                  <div class="product__price flex">
                    <span class="new__price">$238.85</span>
                    <span class="old__price">$245.8</span>
                  </div>
                  <a
                    href="#"
                    class="action__btn cart__btn"
                    aria-label="Add To Cart"
                  >
                    <i class="fi fi-rs-shopping-bag-add"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="deals section">
        <div class="deals__container container grid">
          <div class="deals__item">
            <div class="deals__group">
              <h3 class="deals__brand">Deals of the Day</h3>
              <span class="deals__category">Limited quantities</span>
            </div>
            <h4 class="deals__title">Summer Collection New Modern Design</h4>
            <div class="deals__price flex">
              <span class="new__price">$139.00</span>
              <span class="old__price">$160.99</span>
            </div>
            <div class="deals__group">
              <p class="deals__countdown-text">Hurry Up! Offer Ends In:</p>
              <div class="countdown">
                <div class="countdown__amount">
                  <p class="countdown__period">02</p>
                  <span class="unit">Days</span>
                </div>
                <div class="countdown__amount">
                  <p class="countdown__period">22</p>
                  <span class="unit">Hours</span>
                </div>
                <div class="countdown__amount">
                  <p class="countdown__period">57</p>
                  <span class="unit">Mins</span>
                </div>
                <div class="countdown__amount">
                  <p class="countdown__period">28</p>
                  <span class="unit">Sec</span>
                </div>
              </div>
            </div>
            <div class="deals__btn">
              <a href="/details" class="btn btn--md">Shop Now</a>
            </div>
          </div>
          <div class="deals__item">
            <div class="deals__group">
              <h3 class="deals__brand">Women Clothing</h3>
              <span class="deals__category">Shirts & Bag</span>
            </div>
            <h4 class="deals__title">Try Something new on vacation</h4>
            <div class="deals__price flex">
              <span class="new__price">$178.00</span>
              <span class="old__price">$256.99</span>
            </div>
            <div class="deals__group">
              <p class="deals__countdown-text">Hurry Up! Offer Ends In:</p>
              <div class="countdown">
                <div class="countdown__amount">
                  <p class="countdown__period">02</p>
                  <span class="unit">Days</span>
                </div>
                <div class="countdown__amount">
                  <p class="countdown__period">22</p>
                  <span class="unit">Hours</span>
                </div>
                <div class="countdown__amount">
                  <p class="countdown__period">57</p>
                  <span class="unit">Mins</span>
                </div>
                <div class="countdown__amount">
                  <p class="countdown__period">28</p>
                  <span class="unit">Sec</span>
                </div>
              </div>
            </div>
            <div class="deals__btn">
              <a href="/details" class="btn btn--md">Shop Now</a>
            </div>
          </div>
        </div>
      </section>

     
      <section class="new__arrivals container section">
        <h3 class="section__title"><span>New</span> Arrivals</h3>
        <div class="new__container swiper">
          <div class="swiper-wrapper">
            <div class="product__item swiper-slide">
              <div class="product__banner">
                <a href="/details" class="product__images">
                  <img
                    src="assets/img/product-1-1.jpg"
                    alt=""
                    class="product__img default"
                  />
                  <img
                    src="assets/img/product-1-2.jpg"
                    alt=""
                    class="product__img hover"
                  />
                </a>
                <div class="product__actions">
                  <a href="#" class="action__btn" aria-label="Quick View">
                    <i class="fi fi-rs-eye"></i>
                  </a>
                  <a href="#" class="action__btn" aria-label="Add to Wishlist">
                    <i class="fi fi-rs-heart"></i>
                  </a>
                  <a href="#" class="action__btn" aria-label="Compare">
                    <i class="fi fi-rs-shuffle"></i>
                  </a>
                </div>
                <div class="product__badge light-pink">Hot</div>
              </div>
              <div class="product__content">
                <span class="product__category">Clothing</span>
                <a href="/details">
                  <h3 class="product__title">Colorful Pattern Shirts</h3>
                </a>
                <div class="product__rating">
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                </div>
                <div class="product__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
                <a
                  href="#"
                  class="action__btn cart__btn"
                  aria-label="Add To Cart"
                >
                  <i class="fi fi-rs-shopping-bag-add"></i>
                </a>
              </div>
            </div>
            <div class="product__item swiper-slide">
              <div class="product__banner">
                <a href="/details" class="product__images">
                  <img
                    src="assets/img/product-2-1.jpg"
                    alt=""
                    class="product__img default"
                  />
                  <img
                    src="assets/img/product-2-2.jpg"
                    alt=""
                    class="product__img hover"
                  />
                </a>
                <div class="product__actions">
                  <a href="#" class="action__btn" aria-label="Quick View">
                    <i class="fi fi-rs-eye"></i>
                  </a>
                  <a href="#" class="action__btn" aria-label="Add to Wishlist">
                    <i class="fi fi-rs-heart"></i>
                  </a>
                  <a href="#" class="action__btn" aria-label="Compare">
                    <i class="fi fi-rs-shuffle"></i>
                  </a>
                </div>
                <div class="product__badge light-green">Hot</div>
              </div>
              <div class="product__content">
                <span class="product__category">Clothing</span>
                <a href="/details">
                  <h3 class="product__title">Colorful Pattern Shirts</h3>
                </a>
                <div class="product__rating">
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                </div>
                <div class="product__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
                <a
                  href="#"
                  class="action__btn cart__btn"
                  aria-label="Add To Cart"
                >
                  <i class="fi fi-rs-shopping-bag-add"></i>
                </a>
              </div>
            </div>
            <div class="product__item swiper-slide">
              <div class="product__banner">
                <a href="/details" class="product__images">
                  <img
                    src="assets/img/product-3-1.jpg"
                    alt=""
                    class="product__img default"
                  />
                  <img
                    src="assets/img/product-3-2.jpg"
                    alt=""
                    class="product__img hover"
                  />
                </a>
                <div class="product__actions">
                  <a href="#" class="action__btn" aria-label="Quick View">
                    <i class="fi fi-rs-eye"></i>
                  </a>
                  <a href="#" class="action__btn" aria-label="Add to Wishlist">
                    <i class="fi fi-rs-heart"></i>
                  </a>
                  <a href="#" class="action__btn" aria-label="Compare">
                    <i class="fi fi-rs-shuffle"></i>
                  </a>
                </div>
                <div class="product__badge light-orange">Hot</div>
              </div>
              <div class="product__content">
                <span class="product__category">Clothing</span>
                <a href="/details">
                  <h3 class="product__title">Colorful Pattern Shirts</h3>
                </a>
                <div class="product__rating">
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                </div>
                <div class="product__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
                <a
                  href="#"
                  class="action__btn cart__btn"
                  aria-label="Add To Cart"
                >
                  <i class="fi fi-rs-shopping-bag-add"></i>
                </a>
              </div>
            </div>
            <div class="product__item swiper-slide">
              <div class="product__banner">
                <a href="/details" class="product__images">
                  <img
                    src="assets/img/product-4-1.jpg"
                    alt=""
                    class="product__img default"
                  />
                  <img
                    src="assets/img/product-4-2.jpg"
                    alt=""
                    class="product__img hover"
                  />
                </a>
                <div class="product__actions">
                  <a href="#" class="action__btn" aria-label="Quick View">
                    <i class="fi fi-rs-eye"></i>
                  </a>
                  <a href="#" class="action__btn" aria-label="Add to Wishlist">
                    <i class="fi fi-rs-heart"></i>
                  </a>
                  <a href="#" class="action__btn" aria-label="Compare">
                    <i class="fi fi-rs-shuffle"></i>
                  </a>
                </div>
                <div class="product__badge light-blue">Hot</div>
              </div>
              <div class="product__content">
                <span class="product__category">Clothing</span>
                <a href="/details">
                  <h3 class="product__title">Colorful Pattern Shirts</h3>
                </a>
                <div class="product__rating">
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                </div>
                <div class="product__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
                <a
                  href="#"
                  class="action__btn cart__btn"
                  aria-label="Add To Cart"
                >
                  <i class="fi fi-rs-shopping-bag-add"></i>
                </a>
              </div>
            </div>
            <div class="product__item swiper-slide">
              <div class="product__banner">
                <a href="/details" class="product__images">
                  <img
                    src="assets/img/product-5-1.jpg"
                    alt=""
                    class="product__img default"
                  />
                  <img
                    src="assets/img/product-5-2.jpg"
                    alt=""
                    class="product__img hover"
                  />
                </a>
                <div class="product__actions">
                  <a href="#" class="action__btn" aria-label="Quick View">
                    <i class="fi fi-rs-eye"></i>
                  </a>
                  <a href="#" class="action__btn" aria-label="Add to Wishlist">
                    <i class="fi fi-rs-heart"></i>
                  </a>
                  <a href="#" class="action__btn" aria-label="Compare">
                    <i class="fi fi-rs-shuffle"></i>
                  </a>
                </div>
                <div class="product__badge light-blue">-30%</div>
              </div>
              <div class="product__content">
                <span class="product__category">Clothing</span>
                <a href="/details">
                  <h3 class="product__title">Colorful Pattern Shirts</h3>
                </a>
                <div class="product__rating">
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                </div>
                <div class="product__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
                <a
                  href="#"
                  class="action__btn cart__btn"
                  aria-label="Add To Cart"
                >
                  <i class="fi fi-rs-shopping-bag-add"></i>
                </a>
              </div>
            </div>
            <div class="product__item swiper-slide">
              <div class="product__banner">
                <a href="/details" class="product__images">
                  <img
                    src="assets/img/product-6-1.jpg"
                    alt=""
                    class="product__img default"
                  />
                  <img
                    src="assets/img/product-6-2.jpg"
                    alt=""
                    class="product__img hover"
                  />
                </a>
                <div class="product__actions">
                  <a href="#" class="action__btn" aria-label="Quick View">
                    <i class="fi fi-rs-eye"></i>
                  </a>
                  <a href="#" class="action__btn" aria-label="Add to Wishlist">
                    <i class="fi fi-rs-heart"></i>
                  </a>
                  <a href="#" class="action__btn" aria-label="Compare">
                    <i class="fi fi-rs-shuffle"></i>
                  </a>
                </div>
                <div class="product__badge light-blue">-22%</div>
              </div>
              <div class="product__content">
                <span class="product__category">Clothing</span>
                <a href="/details">
                  <h3 class="product__title">Colorful Pattern Shirts</h3>
                </a>
                <div class="product__rating">
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                </div>
                <div class="product__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
                <a
                  href="#"
                  class="action__btn cart__btn"
                  aria-label="Add To Cart"
                >
                  <i class="fi fi-rs-shopping-bag-add"></i>
                </a>
              </div>
            </div>
            <div class="product__item swiper-slide">
              <div class="product__banner">
                <a href="/details" class="product__images">
                  <img
                    src="assets/img/product-7-1.jpg"
                    alt=""
                    class="product__img default"
                  />
                  <img
                    src="assets/img/product-7-2.jpg"
                    alt=""
                    class="product__img hover"
                  />
                </a>
                <div class="product__actions">
                  <a href="#" class="action__btn" aria-label="Quick View">
                    <i class="fi fi-rs-eye"></i>
                  </a>
                  <a href="#" class="action__btn" aria-label="Add to Wishlist">
                    <i class="fi fi-rs-heart"></i>
                  </a>
                  <a href="#" class="action__btn" aria-label="Compare">
                    <i class="fi fi-rs-shuffle"></i>
                  </a>
                </div>
                <div class="product__badge light-green">-22%</div>
              </div>
              <div class="product__content">
                <span class="product__category">Clothing</span>
                <a href="/details">
                  <h3 class="product__title">Colorful Pattern Shirts</h3>
                </a>
                <div class="product__rating">
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                  <i class="fi fi-rs-star"></i>
                </div>
                <div class="product__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
                <a
                  href="#"
                  class="action__btn cart__btn"
                  aria-label="Add To Cart"
                >
                  <i class="fi fi-rs-shopping-bag-add"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="swiper-button-prev">
            <i class="fi fi-rs-angle-left"></i>
          </div>
          <div class="swiper-button-next">
            <i class="fi fi-rs-angle-right"></i>
          </div>
        </div>
      </section>

      <section class="showcase section">
        <div class="showcase__container container grid">
          <div class="showcase__wrapper">
            <h3 class="section__title">Hot Releases</h3>
            <div class="showcase__item">
              <a href="/details" class="showcase__img-box">
                <img
                  src="./assets/img/showcase-img-1.jpg"
                  alt=""
                  class="showcase__img"
                />
              </a>
              <div class="showcase__content">
                <a href="/details">
                  <h4 class="showcase__title">
                    Floral Print Casual Cotton Dress
                  </h4>
                </a>
                <div class="showcase__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
              </div>
            </div>
            <div class="showcase__item">
              <a href="/details" class="showcase__img-box">
                <img
                  src="./assets/img/showcase-img-2.jpg"
                  alt=""
                  class="showcase__img"
                />
              </a>
              <div class="showcase__content">
                <a href="/details">
                  <h4 class="showcase__title">
                    Ruffled Solid Long Sleeve Blouse
                  </h4>
                </a>
                <div class="showcase__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
              </div>
            </div>
            <div class="showcase__item">
              <a href="/details" class="showcase__img-box">
                <img
                  src="./assets/img/showcase-img-3.jpg"
                  alt=""
                  class="showcase__img"
                />
              </a>
              <div class="showcase__content">
                <a href="/details">
                  <h4 class="showcase__title">
                    Multi-Color Print V-neck T-shirt
                  </h4>
                </a>
                <div class="showcase__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
              </div>
            </div>
          </div>
          <div class="showcase__wrapper">
            <h3 class="section__title">Deals & Outlet</h3>
            <div class="showcase__item">
              <a href="/details" class="showcase__img-box">
                <img
                  src="./assets/img/showcase-img-4.jpg"
                  alt=""
                  class="showcase__img"
                />
              </a>
              <div class="showcase__content">
                <a href="/details">
                  <h4 class="showcase__title">Fish Print Patched T-shirt</h4>
                </a>
                <div class="showcase__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
              </div>
            </div>
            <div class="showcase__item">
              <a href="/details" class="showcase__img-box">
                <img
                  src="./assets/img/showcase-img-5.jpg"
                  alt=""
                  class="showcase__img"
                />
              </a>
              <div class="showcase__content">
                <a href="/details">
                  <h4 class="showcase__title">Fintage Floral Print Dress</h4>
                </a>
                <div class="showcase__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
              </div>
            </div>
            <div class="showcase__item">
              <a href="/details" class="showcase__img-box">
                <img
                  src="./assets/img/showcase-img-6.jpg"
                  alt=""
                  class="showcase__img"
                />
              </a>
              <div class="showcase__content">
                <a href="/details">
                  <h4 class="showcase__title">
                    Multi-Color Stripe Circle T-shirt
                  </h4>
                </a>
                <div class="showcase__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
              </div>
            </div>
          </div>
          <div class="showcase__wrapper">
            <h3 class="section__title">Top Selling</h3>
            <div class="showcase__item">
              <a href="/details" class="showcase__img-box">
                <img
                  src="./assets/img/showcase-img-7.jpg"
                  alt=""
                  class="showcase__img"
                />
              </a>
              <div class="showcase__content">
                <a href="/details">
                  <h4 class="showcase__title">
                    Geometric Printed Long Sleeve Blouse
                  </h4>
                </a>
                <div class="showcase__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
              </div>
            </div>
            <div class="showcase__item">
              <a href="/details" class="showcase__img-box">
                <img
                  src="./assets/img/showcase-img-8.jpg"
                  alt=""
                  class="showcase__img"
                />
              </a>
              <div class="showcase__content">
                <a href="/details">
                  <h4 class="showcase__title">Print Patchwork Maxi Dress</h4>
                </a>
                <div class="showcase__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
              </div>
            </div>
            <div class="showcase__item">
              <a href="/details" class="showcase__img-box">
                <img
                  src="./assets/img/showcase-img-9.jpg"
                  alt=""
                  class="showcase__img"
                />
              </a>
              <div class="showcase__content">
                <a href="/details">
                  <h4 class="showcase__title">
                    Daisy Floral Print Straps Jumpsuit
                  </h4>
                </a>
                <div class="showcase__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
              </div>
            </div>
          </div>
          <div class="showcase__wrapper">
            <h3 class="section__title">Trendy</h3>
            <div class="showcase__item">
              <a href="/details" class="showcase__img-box">
                <img
                  src="./assets/img/showcase-img-7.jpg"
                  alt=""
                  class="showcase__img"
                />
              </a>
              <div class="showcase__content">
                <a href="/details">
                  <h4 class="showcase__title">Floral Print Casual Cotton</h4>
                </a>
                <div class="showcase__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
              </div>
            </div>
            <div class="showcase__item">
              <a href="/details" class="showcase__img-box">
                <img
                  src="./assets/img/showcase-img-8.jpg"
                  alt=""
                  class="showcase__img"
                />
              </a>
              <div class="showcase__content">
                <a href="/details">
                  <h4 class="showcase__title">Ruffled Solid Long Sleeve</h4>
                </a>
                <div class="showcase__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
              </div>
            </div>
            <div class="showcase__item">
              <a href="/details" class="showcase__img-box">
                <img
                  src="./assets/img/showcase-img-9.jpg"
                  alt=""
                  class="showcase__img"
                />
              </a>
              <div class="showcase__content">
                <a href="/details">
                  <h4 class="showcase__title">Multi-Color Print V-neck</h4>
                </a>
                <div class="showcase__price flex">
                  <span class="new__price">$238.85</span>
                  <span class="old__price">$245.8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    
      <section class="newsletter section home__newsletter">
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
