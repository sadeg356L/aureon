import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-mark"></span>
              <span className="logo-text">
                AUREON
                <small>TECHNOLOGY, ELEVATED</small>
              </span>
            </Link>
            <p className="footer-description">
              Premium electronics retailer offering exceptional technology, thoughtfully selected for the way you live.
            </p>
            <div className="footer-contact">
              <div className="contact-item">
                <Mail size={18} />
                <span>contact@aureon.tn</span>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <span>+216 XX XXX XXX</span>
              </div>
              <div className="contact-item">
                <MapPin size={18} />
                <span>Tunis, Tunisia</span>
              </div>
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Shop</h4>
            <ul className="footer-links">
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/shop?category=smartphones">Smartphones</Link></li>
              <li><Link to="/shop?category=laptops">Laptops</Link></li>
              <li><Link to="/shop?category=cameras">Cameras</Link></li>
              <li><Link to="/shop?category=accessories">Accessories</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Customer Care</h4>
            <ul className="footer-links">
              <li><Link to="/account">My Account</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/checkout">Checkout</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">About</h4>
            <ul className="footer-links">
              <li><a href="#about">Our Story</a></li>
              <li><a href="#about">Shipping Info</a></li>
              <li><a href="#about">Returns</a></li>
              <li><a href="#about">Privacy Policy</a></li>
              <li><a href="#about">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© 2026 AUREON. All rights reserved.</p>
          <p className="footer-note">Demo store - Not for real commercial use</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
