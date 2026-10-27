import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Page Not Found</h2>
          <p className="not-found-text">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              <Home size={18} />
              Back to Home
            </Link>
            <Link to="/shop" className="btn btn-ghost">
              <ArrowLeft size={18} />
              Browse Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
