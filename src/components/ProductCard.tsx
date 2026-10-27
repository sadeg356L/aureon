import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Eye } from 'lucide-react'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import './ProductCard.css'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: product.currency,
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleWishlist(product)
  }

  return (
    <Link to={`/product/${product.slug}`} className="product-card">
      <div className="product-card-image-wrapper">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="product-card-image"
          loading="lazy"
        />
        {product.compareAtPrice && (
          <span className="product-badge sale">Sale</span>
        )}
        {product.featured && !product.compareAtPrice && (
          <span className="product-badge featured">Featured</span>
        )}
        <div className="product-card-actions">
          <button
            className={`product-action-btn ${inWishlist ? 'active' : ''}`}
            onClick={handleToggleWishlist}
            aria-label="Add to wishlist"
          >
            <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
          <button
            className="product-action-btn"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingBag size={18} />
          </button>
          <button className="product-action-btn" aria-label="Quick view">
            <Eye size={18} />
          </button>
        </div>
      </div>
      <div className="product-card-content">
        <span className="product-card-brand">{product.brand}</span>
        <h3 className="product-card-name">{product.name}</h3>
        <div className="product-card-price">
          <span className="price-current">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="price-compare">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>
        {product.stock > 0 ? (
          <span className="product-stock in-stock">In Stock</span>
        ) : (
          <span className="product-stock out-of-stock">Out of Stock</span>
        )}
      </div>
    </Link>
  )
}

export default ProductCard
