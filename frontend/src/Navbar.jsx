import { Link, NavLink } from "react-router-dom";
import "./index.css"; // using the same theme vars

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__container">
        {/* Left: Logo / Brand */}
        <Link to="/" className="navbar__brand">
          <span className="navbar__logo" aria-hidden>🍽️</span>
          <span className="navbar__name">reciPal</span>
        </Link>

        {/* Center: Nav links */}
        <nav className="navbar__nav">
          <NavLink to="/" end className="navbar__link">
            Home
          </NavLink>
          <NavLink to="/recipes" className="navbar__link">
            Recipes
          </NavLink>
          <NavLink to="/pantry" className="navbar__link">
            Pantry
          </NavLink>
          <NavLink to="/grocery" className="navbar__link">
            Grocery List
          </NavLink>
        </nav>

        {/* Right: Actions */}
        <div className="navbar__actions">
          <Link to="/login" className="navbar__action">Login</Link>
          <Link to="/user" className="navbar__avatar" aria-label="User Profile">👤</Link>
        </div>
      </div>
    </header>
  );
}
