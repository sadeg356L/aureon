import { useParams, Link } from 'react-router-dom'
import { Heart, ShoppingBag, Minus, Plus, Check, Truck, Shield, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { getProductBySlug } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ThreeDViewer from '../components/ThreeDViewer'
import './ProductDetail.css'

const ProductDetail = () => {
  const { slug } = useParams()
  const product = getProductBySlug(slug || '')
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [show3D, setShow3D] = useState(false)

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="btn btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const inWishlist = isInWishlist(product.id)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: product.currency,
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1)
  }

  return (
    <div className="product-detail">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <div className="product-detail-grid">
          <div className="product-gallery">
            <div className="gallery-main">
              {show3D && product.model3dPath ? (
                <ThreeDViewer modelPath={product.model3dPath} />
              ) : (
                <img 
                  src={product.images[activeImage]} 
                  alt={product.name}
                  className="gallery-main-image"
                />
              )}
            </div>
            <div className="gallery-thumbnails">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  className={`gallery-thumb ${activeImage === index && !show3D ? 'active' : ''}`}
                  onClick={() => {
                    setActiveImage(index)
                    setShow3D(false)
                  }}
                >
                  <img src={img} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
              {product.model3dPath && (
                <button
                  className={`gallery-thumb gallery-thumb-3d ${show3D ? 'active' : ''}`}
                  onClick={() => setShow3D(true)}
                >
                  <span>3D</span>
                </button>
              )}
            </div>
            {product.model3dPath && !show3D && (
              <button className="explore-3d-btn" onClick={() => setShow3D(true)}>
                <span>Explore in 3D</span>
              </button>
            )}
          </div>

          <div className="product-info">
            <div className="product-info-header">
              <span className="product-brand">{product.brand}</span>
              <h1 className="product-title">{product.name}</h1>
              <div className="product-price-row">
                <span className="product-price">{formatPrice(product.price)}</span>
                {product.compareAtPrice && (
                  <span className="product-price-compare">{formatPrice(product.compareAtPrice)}</span>
                )}
              </div>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-stock-info">
              {product.stock > 0 ? (
                <div className="stock-status in-stock">
                  <Check size={16} />
                  <span>In Stock ({product.stock} available)</span>
                </div>
              ) : (
                <div className="stock-status out-of-stock">
                  <span>Out of Stock</span>
                </div>
              )}
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <button onClick={decreaseQuantity} className="quantity-btn">
                  <Minus size={16} />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button onClick={increaseQuantity} className="quantity-btn">
                  <Plus size={16} />
                </button>
              </div>
              <button 
                className="btn btn-primary add-to-cart-btn" 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingBag size={18} />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button 
                className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Add to wishlist"
              >
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="product-features">
              <div className="product-feature">
                <Truck size={20} />
                <div>
                  <strong>Free Shipping</strong>
                  <span>On orders over 500 TND</span>
                </div>
              </div>
              <div className="product-feature">
                <Shield size={20} />
                <div>
                  <strong>Warranty</strong>
                  <span>1 year manufacturer warranty</span>
                </div>
              </div>
              <div className="product-feature">
                <RefreshCw size={20} />
                <div>
                  <strong>Returns</strong>
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>

            <div className="product-specs">
              <h3>Specifications</h3>
              <div className="specs-table">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="spec-row">
                    <span className="spec-key">{key}</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
