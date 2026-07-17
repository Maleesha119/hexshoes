import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-mark">HEXSHOES</div>
      <div className="nav-links">
        <a href="#shop">Shop</a>
        <a href="#ai-search">Find My Shoe</a>
        <a href="#about">About</a>
      </div>
      <div className="nav-right">
        <span>Sign in</span>
        <span>Cart · 0</span>
      </div>
    </nav>
  )
}

export default Navbar