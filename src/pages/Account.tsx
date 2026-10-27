import { User, Mail, Phone } from 'lucide-react'
import './Account.css'

const Account = () => {
  return (
    <div className="account">
      <div className="container">
        <div className="account-header">
          <h1 className="account-title">My Account</h1>
          <span className="account-badge">DEMO</span>
        </div>

        <div className="account-layout">
          <aside className="account-sidebar">
            <div className="account-profile">
              <div className="account-avatar">
                <User size={32} />
              </div>
              <div>
                <h3>Guest User</h3>
                <p>Demo Account</p>
              </div>
            </div>
            <nav className="account-nav">
              <button className="account-nav-item active">Profile</button>
              <button className="account-nav-item">Orders</button>
              <button className="account-nav-item">Addresses</button>
              <button className="account-nav-item">Settings</button>
            </nav>
          </aside>

          <main className="account-main">
            <section className="account-section">
              <h2 className="account-section-title">Personal Information</h2>
              <div className="account-form">
                <div className="account-form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your name" disabled />
                </div>
                <div className="account-form-group">
                  <label>Email Address</label>
                  <div className="account-input-with-icon">
                    <Mail size={18} />
                    <input type="email" placeholder="email@example.com" disabled />
                  </div>
                </div>
                <div className="account-form-group">
                  <label>Phone Number</label>
                  <div className="account-input-with-icon">
                    <Phone size={18} />
                    <input type="tel" placeholder="+216 XX XXX XXX" disabled />
                  </div>
                </div>
              </div>
              <p className="account-note">
                This is a demo account interface. Authentication infrastructure is not implemented. 
                A real backend with secure authentication would be required for production use.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Account
