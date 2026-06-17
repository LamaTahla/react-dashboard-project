import { NavLink, Outlet } from 'react-router-dom';

function WebsiteLayout() {
  return (
    <div className="website-layout">
      <header className="website-navbar">
        <h2>My Website</h2>

        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/about">
            About
          </NavLink>

          <NavLink to="/blog">
            Blog
          </NavLink>

          <NavLink to="/contact">
            Contact
          </NavLink>

          <NavLink to="/admin">
            Dashboard
          </NavLink>
        </nav>
      </header>

      <main className="website-content">
        <Outlet />
      </main>
    </div>
  );
}

export default WebsiteLayout;