import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }){
  const [cartItems, setCartItems] = useState([])

  useEffect(()=>{
    try{
      const raw = localStorage.getItem('evara_cart')
      if(raw) setCartItems(JSON.parse(raw))
    }catch(e){
      console.warn('Failed to load cart from localStorage', e)
    }
  }, [])

  useEffect(()=>{
    try{
      localStorage.setItem('evara_cart', JSON.stringify(cartItems))
    }catch(e){
      console.warn('Failed to save cart to localStorage', e)
    }
  }, [cartItems])

  const addToCart = (product) => {
    if(!product) return

    // build a stable key: prefer explicit id, otherwise name+image
    const key = product.id ? String(product.id) : `${product.name}::${product.image || ''}`

    try{ console.log('CartContext.addToCart called', { key, product }) }catch(e){}

    setCartItems(prev => {
      const idx = prev.findIndex(i => (i._key || `${i.name}::${i.image||''}`) === key)
      if(idx > -1){
        const copy = [...prev]
        copy[idx].quantity = (copy[idx].quantity || 1) + 1
        return copy
      }
      return [...prev, { ...product, quantity: 1, _key: key }]
    })
  }

  const removeFromCart = (identifier) => {
    setCartItems(prev => prev.filter(i => {
      const key = i._key || `${i.name}::${i.image||''}`
      return !(identifier === key || identifier === i.name)
    }))
  }

  const updateQuantity = (identifier, quantity) => {
    setCartItems(prev => prev.map(i => {
      const key = i._key || `${i.name}::${i.image||''}`
      if(identifier === key || identifier === i.name){
        return { ...i, quantity: Math.max(1, quantity) }
      }
      return i
    }))
  }

  const clearCart = () => setCartItems([])

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(){
  return useContext(CartContext)
}
