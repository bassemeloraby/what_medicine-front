import React, { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';

import Mederma from '../images/MedermaLogo.png';
import { Link } from 'react-router-dom';
import Login from './Login';
import { useGlobalContext } from '../context';

function NavbarA() {
  const [showLinks, setShowLinks] = useState(false);
  const { setAdmin, admin, setAdminOpen, adminOpen, asAdmin, asUser } =
    useGlobalContext();
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = '0px';
    }
  }, [showLinks]);
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img src={Mederma} className="logo" alt="logo" />
          <button className="nav-toggle" onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/medicine">Medicine</Link>
            </li>
            <li>
              <Link to="/companies">Companies</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </div>
        <div className='log-aria'>
        {!adminOpen ? (
          <button onClick={asAdmin}>login</button>
        ) : (
          <button onClick={asUser}>logout</button>
        )}
        {admin ? (
          <Login setAdminOpen={setAdminOpen} setAdmin={setAdmin}/>
        ) : (
          ''
        )}
        </div>
      </div>
    </nav>
  );
}

export default NavbarA;
