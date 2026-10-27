import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import './Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getCartCount } = useCart()
  const { items: wishlistItems } = useWishlist()
  const cartCount = getCartCount()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/shop?category=smartphones', label: 'Smartphones' },
    { path: '/shop?category=laptops', label: 'Laptops' },
    { path: '/shop?category=cameras', label: 'Cameras' },
    { path: '/shop?category=accessories', label: 'Accessories' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-mark"></span>
          <span className="logo-text">
            AUREON
            <small>TECHNOLOGY, ELEVATED</small>
          </span>
        </Link>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="navbar-actions">
          <Link to="/search" className="nav-action-btn" aria-label="Search">
            <Search size={20} />
          </Link>
          <Link to="/account" className="nav-action-btn" aria-label="Account">
            <User size={20} />
          </Link>
          <Link to="/wishlist" className="nav-action-btn" aria-label="Wishlist">
            <Heart size={20} />
            {wishlistItems.length > 0 && <span className="nav-badge">{wishlistItems.length}</span>}
          </Link>
          <Link to="/cart" className="nav-action-btn" aria-label="Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
          </Link>
          <button
            className="nav-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
