import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Product } from '../data/products'

export interface CartItem {
  product: Product
  quantity: number
  variantId?: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity?: number, variantId?: string) => void
  removeFromCart: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aureon-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('aureon-cart', JSON.stringify(items))
    } catch (e) {
      console.error('Failed to save cart:', e)
    }
  }, [items])

  const addToCart = (product: Product, quantity = 1, variantId?: string) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.variantId === variantId
      )
      if (existingIndex > -1) {
        const updated = [...prev]
        const newQty = updated[existingIndex].quantity + quantity
        if (newQty > product.stock) {
          updated[existingIndex].quantity = product.stock
        } else {
          updated[existingIndex].quantity = newQty
        }
        return updated
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock), variantId }]
    })
  }

  const removeFromCart = (productId: string, variantId?: string) => {
    setItems(prev => prev.filter(item => !(item.product.id === productId && item.variantId === variantId)))
  }

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId)
      return
    }
    setItems(prev => prev.map(item => {
      if (item.product.id === productId && item.variantId === variantId) {
        return { ...item, quantity: Math.min(quantity, item.product.stock) }
      }
      return item
    }))
  }

  const clearCart = () => {
    setItems([])
  }

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount }}>
      {children}
    </CartContext.Provider>
  )
}
