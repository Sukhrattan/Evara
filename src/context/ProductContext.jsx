import React, { createContext, useContext, useState, useEffect } from 'react'

const ProductContext = createContext()

export function ProductProvider({ children }){
  const [selectedProduct, setSelectedProduct] = useState(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem('evara_selected_product')
    return saved ? JSON.parse(saved) : null
  })

  // Persist to localStorage whenever it changes
  useEffect(() => {
    if (selectedProduct) {
      localStorage.setItem('evara_selected_product', JSON.stringify(selectedProduct))
    } else {
      localStorage.removeItem('evara_selected_product')
    }
  }, [selectedProduct])

  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProduct(){
  return useContext(ProductContext)
}
