import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Details from './pages/Details'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Accounts from './pages/Accounts'
import LoginRegister from './pages/LoginRegister'
import Compare from './pages/Compare'
import Wishlist from './pages/Wishlist'
import Header from './components/header.jsx'
export default function App(){
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <div>
            <Header/>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/shop" element={<Shop/>} />
              <Route path="/details" element={<Details/>} />
              <Route path="/cart" element={<Cart/>} />
              <Route path="/checkout" element={<Checkout/>} />
              <Route path="/accounts" element={<Accounts/>} />
              <Route path="/login" element={<LoginRegister/>} />
              <Route path="/compare" element={<Compare/>} />
              <Route path="/wishlist" element={<Wishlist/>} />
            </Routes>
          </div>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  )
}
