import { Link } from 'react-router-dom'
import { CheckCircle, Package } from 'lucide-react'
import './CheckoutSuccess.css'

const CheckoutSuccess = () => {
  const order = JSON.parse(localStorage.getItem('aureon-last-order') || '{}')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="checkout-success">
      <div className="container">
        <div className="success-content">
          <div className="success-icon">
            <CheckCircle size={64} />
          </div>
          <h1 className="success-title">Order Confirmed!</h1>
          <p className="success-subtitle">
            Thank you for your order. This is a demo order - no payment was processed.
          </p>
          
          {order.id && (
            <div className="order-details">
              <div className="order-detail-row">
                <span>Order Number</span>
                <strong>{order.id}</strong>
              </div>
              <div className="order-detail-row">
                <span>Total Amount</span>
                <strong>{formatPrice(order.total || 0)}</strong>
              </div>
              <div className="order-detail-row">
                <span>Items</span>
                <strong>{order.items?.length || 0}</strong>
              </div>
            </div>
          )}

          <div className="success-info">
            <Package size={20} />
            <p>We'll send you a confirmation email once your order is ready (demo).</p>
          </div>

          <div className="success-actions">
            <Link to="/shop" className="btn btn-primary">
              Continue Shopping
            </Link>
            <Link to="/" className="btn btn-ghost">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccess
