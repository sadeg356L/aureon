import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Shield, RefreshCw, Sparkles } from 'lucide-react'
import { getFeaturedProducts } from '../data/products'
import ProductCard from '../components/ProductCard'
import ThreeDViewer from '../components/ThreeDViewer'
import './Home.css'

const Home = () => {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-grid"></div>
        </div>
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>Premium Collection</span>
            </div>
            <h1 className="hero-title">
              Discover
              <span className="hero-title-accent"> What's Next</span>
            </h1>
            <p className="hero-subtitle">
              Exceptional technology. Thoughtfully selected. Designed for the way you live.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-primary">
                Explore Collection
                <ArrowRight size={18} />
              </Link>
              <Link to="/shop" className="btn btn-secondary">
                Discover Our World
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">5+</span>
                <span className="hero-stat-label">Premium Products</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">3D</span>
                <span className="hero-stat-label">Interactive Viewing</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">TND</span>
                <span className="hero-stat-label">Local Currency</span>
              </div>
            </div>
          </div>
          <div className="hero-3d">
            <ThreeDViewer modelPath="/models/free_iphone_13_pro_2021.glb" />
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll to explore</span>
          <div className="hero-scroll-line"></div>
        </div>
      </section>

      <section className="announcement-bar">
        <div className="container announcement-container">
          <div className="announcement-item">
            <Truck size={18} />
            <span>Free shipping on orders over 500 TND</span>
          </div>
          <div className="announcement-item">
            <Shield size={18} />
            <span>Secure checkout • 1 year warranty</span>
          </div>
          <div className="announcement-item">
            <RefreshCw size={18} />
            <span>30-day returns</span>
          </div>
        </div>
      </section>

      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Categories</span>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Explore our curated selection of premium electronics</p>
          </div>
          <div className="categories-grid">
            <Link to="/shop?category=smartphones" className="category-card">
              <div className="category-image">
                <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80" alt="Smartphones" />
              </div>
              <div className="category-content">
                <h3 className="category-name">Smartphones</h3>
                <span className="category-count">2 Products</span>
              </div>
            </Link>
            <Link to="/shop?category=laptops" className="category-card">
              <div className="category-image">
                <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80" alt="Laptops" />
              </div>
              <div className="category-content">
                <h3 className="category-name">Laptops</h3>
                <span className="category-count">2 Products</span>
              </div>
            </Link>
            <Link to="/shop?category=cameras" className="category-card">
              <div className="category-image">
                <img src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80" alt="Cameras" />
              </div>
              <div className="category-content">
                <h3 className="category-name">Cameras</h3>
                <span className="category-count">1 Product</span>
              </div>
            </Link>
            <Link to="/shop?category=accessories" className="category-card">
              <div className="category-image">
                <img src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&q=80" alt="Accessories" />
              </div>
              <div className="category-content">
                <h3 className="category-name">Accessories</h3>
                <span className="category-count">1 Product</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-label">Featured</span>
              <h2 className="section-title">Best Sellers</h2>
              <p className="section-subtitle">Handpicked products for discerning tech enthusiasts</p>
            </div>
            <Link to="/shop" className="btn btn-ghost">
              View All
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-3">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section experience-section">
        <div className="container">
          <div className="experience-grid">
            <div className="experience-content">
              <span className="section-label">Interactive Experience</span>
              <h2 className="section-title">Explore in 3D</h2>
              <p className="experience-description">
                Experience our products like never before with interactive 3D viewing. Rotate, zoom, and examine every detail from every angle before making your purchase.
              </p>
              <ul className="experience-features">
                <li>
                  <div className="experience-dot"></div>
                  <span>360° product rotation</span>
                </li>
                <li>
                  <div className="experience-dot"></div>
                  <span>Zoom to see fine details</span>
                </li>
                <li>
                  <div className="experience-dot"></div>
                  <span>Touch and mouse friendly</span>
                </li>
                <li>
                  <div className="experience-dot"></div>
                  <span>Premium studio lighting</span>
                </li>
              </ul>
              <Link to="/shop" className="btn btn-primary">
                Try It Now
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="experience-3d">
              <ThreeDViewer modelPath="/models/laptop.glb" />
            </div>
          </div>
        </div>
      </section>

      <section className="section trust-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <Truck size={32} />
              <h3>Fast Delivery</h3>
              <p>Express shipping across Tunisia</p>
            </div>
            <div className="trust-item">
              <Shield size={32} />
              <h3>Secure Checkout</h3>
              <p>Safe and encrypted transactions</p>
            </div>
            <div className="trust-item">
              <RefreshCw size={32} />
              <h3>Easy Returns</h3>
              <p>30-day hassle-free returns</p>
            </div>
            <div className="trust-item">
              <Sparkles size={32} />
              <h3>Premium Quality</h3>
              <p>Carefully curated products</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
