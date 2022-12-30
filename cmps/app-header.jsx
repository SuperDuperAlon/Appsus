const { Link, NavLink } = ReactRouterDOM;

export function AppHeader() {
  return (
    <header className="app-header">
      <Link to="/">
        <h3 className="logo">
          <span className="logo-blue">A</span>
          <span className="logo-red">p</span>
          <span className="logo-yellow">p</span>
          <span className="logo-blue">s</span>
          <span className="logo-green">u</span>
          <span className="logo-red">s</span>
        </h3>
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/mail">Mail</NavLink>
        <NavLink to="/note">Note</NavLink>
      </nav>
    </header>
  );
}
