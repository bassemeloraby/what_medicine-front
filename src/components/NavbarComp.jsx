import { Link } from 'react-router-dom';
function NavbarComp() {
  return (
    <div>
      <section className="container-a">
        <span className="logo">WhatMedicine</span>
        <nav
          className=" justify-content-start"
          data-bs-theme="dark"
        >
          <Link className="a-class" to="/">
            home
          </Link>
          <Link className="a-class" to="/drugs">
            Drugs
          </Link>
        </nav>
      </section>
    </div>
  );
}

export default NavbarComp;
