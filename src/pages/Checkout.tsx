import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import './Checkout.css'

const Checkout = () => {
  const navigate = useNavigate()
  const { items, getCartTotal, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'Tunisia',
    address: '',
    city: '',
    postalCode: '',
    shippingMethod: 'standard'
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (items.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="container">
          <h1>Your Cart is Empty</h1>
          <Link to="/shop" className="btn btn-primary">Go to Shop</Link>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 0
    }).format(price)
  }

  const subtotal = getCartTotal()
  const shipping = formData.shippingMethod === 'express' ? 50 : (subtotal > 500 ? 0 : 30)
  const total = subtotal + shipping

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    else if (!/^[0-9+\s()-]{8,15}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Invalid phone number'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Save demo order
      const order = {
        id: `ORD-${Date.now()}`,
        items,
        total,
        customer: formData,
        date: new Date().toISOString()
      }
      localStorage.setItem('aureon-last-order', JSON.stringify(order))
      clearCart()
      navigate('/checkout/success')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  return (
    <div className="checkout">
      <div className="container">
        <div className="checkout-header">
          <h1 className="checkout-title">Checkout</h1>
          <span className="checkout-badge">DEMO - No real payment</span>
        </div>

        <form onSubmit={handleSubmit} className="checkout-layout">
          <div className="checkout-main">
            <section className="checkout-section">
              <h2 className="checkout-section-title">Contact Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
                <div className="form-group form-group-full">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group form-group-full">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+216 XX XXX XXX"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <h2 className="checkout-section-title">Shipping Address</h2>
              <div className="form-grid">
                <div className="form-group form-group-full">
                  <label htmlFor="country">Country</label>
                  <select id="country" name="country" value={formData.country} onChange={handleChange}>
                    <option value="Tunisia">Tunisia</option>
                  </select>
                </div>
                <div className="form-group form-group-full">
                  <label htmlFor="address">Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <h2 className="checkout-section-title">Shipping Method</h2>
              <div className="shipping-options">
                <label className={`shipping-option ${formData.shippingMethod === 'standard' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="standard"
                    checked={formData.shippingMethod === 'standard'}
                    onChange={handleChange}
                  />
                  <div className="shipping-option-content">
                    <div>
                      <strong>Standard Shipping</strong>
                      <span>3-5 business days</span>
                    </div>
                    <span className="shipping-price">{subtotal > 500 ? 'Free' : formatPrice(30)}</span>
                  </div>
                </label>
                <label className={`shipping-option ${formData.shippingMethod === 'express' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    checked={formData.shippingMethod === 'express'}
                    onChange={handleChange}
                  />
                  <div className="shipping-option-content">
                    <div>
                      <strong>Express Shipping</strong>
                      <span>1-2 business days</span>
                    </div>
                    <span className="shipping-price">{formatPrice(50)}</span>
                  </div>
                </label>
              </div>
            </section>
          </div>

          <aside className="checkout-sidebar">
            <div className="order-summary">
              <h2 className="order-summary-title">Order Summary</h2>
              <div className="order-items">
                {items.map((item, index) => (
                  <div key={`${item.product.id}-${index}`} className="order-item">
                    <div className="order-item-image">
                      <img src={item.product.images[0]} alt={item.product.name} />
                      <span className="order-item-qty">{item.quantity}</span>
                    </div>
                    <div className="order-item-info">
                      <span className="order-item-name">{item.product.name}</span>
                      <span className="order-item-price">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-summary-divider"></div>
              <div className="order-summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="order-summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="order-summary-divider"></div>
              <div className="order-summary-row order-summary-total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button type="submit" className="btn btn-primary place-order-btn">
                Place Order (Demo)
              </button>
              <p className="demo-notice">
                <Check size={14} />
                This is a demo checkout. No payment will be processed.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  )
}

export default Checkout
