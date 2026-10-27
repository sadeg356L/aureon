import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import './Cart.css'

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 0
    }).format(price)
  }

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <div className="cart-empty-content">
            <ShoppingBag size={64} />
            <h1>Your Cart is Empty</h1>
            <p>Add some products to get started</p>
            <Link to="/shop" className="btn btn-primary">
              Start Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 500 ? 0 : 30
  const total = subtotal + shipping

  return (
    <div className="cart">
      <div className="container">
        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
          <span className="cart-count">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item, index) => (
              <div key={`${item.product.id}-${item.variantId || index}`} className="cart-item">
                <Link to={`/product/${item.product.slug}`} className="cart-item-image">
                  <img src={item.product.images[0]} alt={item.product.name} />
                </Link>
                <div className="cart-item-details">
                  <div className="cart-item-info">
                    <span className="cart-item-brand">{item.product.brand}</span>
                    <Link to={`/product/${item.product.slug}`} className="cart-item-name">
                      {item.product.name}
                    </Link>
                    <span className="cart-item-price">{formatPrice(item.product.price)}</span>
                  </div>
                  <div className="cart-item-actions">
                    <div className="cart-quantity-selector">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variantId)}
                        className="cart-quantity-btn"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="cart-quantity-value">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variantId)}
                        className="cart-quantity-btn"
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.product.id, item.variantId)}
                      className="cart-remove-btn"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="cart-item-total">
                  {formatPrice(item.product.price * item.quantity)}
                </div>
              </div>
            ))}
            <div className="cart-actions-row">
              <Link to="/shop" className="btn btn-ghost">
                Continue Shopping
              </Link>
              <button onClick={clearCart} className="cart-clear-btn">
                Clear Cart
              </button>
            </div>
          </div>

          <aside className="cart-summary">
            <h2 className="cart-summary-title">Order Summary</h2>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            {subtotal < 500 && (
              <p className="shipping-note">Add {formatPrice(500 - subtotal)} more for free shipping</p>
            )}
            <div className="cart-summary-divider"></div>
            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link to="/checkout" className="btn btn-primary checkout-btn">
              Proceed to Checkout
              <ArrowRight size={18} />
            </Link>
            <p className="cart-summary-note">Demo checkout - No real payment</p>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Cart
