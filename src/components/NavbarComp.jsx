import { Link } from 'react-router-dom';
function NavbarComp() {
  return (
    <header className="header">
      <span >
        <Link to="/">WhatMedicine</Link>
      </span>
      <nav >
        <Link to="/">
          home
        </Link>
        <Link  to="/medicine">
          Medicine
        </Link>
      </nav>
    </header>
  );
}

export default NavbarComp;
