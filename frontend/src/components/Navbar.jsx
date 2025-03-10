import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CardModal from '../pages/shop/CardModal';
import products from '../data/products';
import { useState } from 'react';

const Navbar = () => {
  // Usa selectedItems en lugar de products.length
  const selectedItems = useSelector((state) => state.cart.selectedItems);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const handleCartToggle = () => {
   setIsCartOpen(!isCartOpen);
  }
  return (
    <header className="fixed-nav-bar w-nav">
      <nav
        className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center"
        role="navigation"
      >
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <Link to="/pages">Pages</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        {/* logo */}
        <div className="nav__logo">
          <Link to="/">TataClothe <span>.</span></Link>
        </div>
        {/* nav icons */}
        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>

          <span>
            <button onClick={handleCartToggle} className="hover:text-primary">
              <i className="ri-shopping-bag-line"></i>
              <sup
                className="text-sm inline-block px-1.5 text-white rounded-full
              bg-primary text-center"
              >
                {selectedItems} {/* Mostrar el total de productos */}
              </sup>
            </button>
          </span>
          <span>
            <Link to="/login">
              <i className="ri-user-line"></i>
            </Link>
          </span>
        </div>
      </nav>
      {
        isCartOpen && <CardModal products={products} isOpen={isCartOpen} onClose=
        {handleCartToggle} />
      }
    </header>
  );
};

export default Navbar;
