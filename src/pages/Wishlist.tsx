import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import './Wishlist.css'

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleAddToCart = (product: any) => {
    addToCart(product)
  }

  if (items.length === 0) {
    return (
      <div className="wishlist-empty">
        <div className="container">
          <div className="wishlist-empty-content">
            <Heart size={64} />
            <h1>Your Wishlist is Empty</h1>
            <p>Save your favorite items for later</p>
            <Link to="/shop" className="btn btn-primary">
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wishlist">
      <div className="container">
        <div className="wishlist-header">
          <h1 className="wishlist-title">My Wishlist</h1>
          <span className="wishlist-count">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
        </div>

        <div className="wishlist-grid">
          {items.map(product => (
            <div key={product.id} className="wishlist-item">
              <Link to={`/product/${product.slug}`} className="wishlist-item-image">
                <img src={product.images[0]} alt={product.name} />
              </Link>
              <div className="wishlist-item-content">
                <span className="wishlist-item-brand">{product.brand}</span>
                <Link to={`/product/${product.slug}`} className="wishlist-item-name">
                  {product.name}
                </Link>
                <span className="wishlist-item-price">{formatPrice(product.price)}</span>
                <div className="wishlist-item-actions">
                  <button 
                    className="btn btn-primary wishlist-add-btn"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingBag size={16} />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                  <button 
                    className="wishlist-remove-btn"
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
