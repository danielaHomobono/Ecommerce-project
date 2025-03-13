import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CardModal from '../pages/shop/CardModal';
import products from '../data/products';
import { useState } from 'react';
import avatarImg from '../assets/avatar.png';
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';

const Navbar = () => {
  // Usa selectedItems en lugar de products.length
  const selectedItems = useSelector((state) => state.cart.selectedItems);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const handleCartToggle = () => {
   setIsCartOpen(!isCartOpen);
  }
  //show user if logged in
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  //dropdown menu
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handDropDownTogle= () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  //admin menu
  const adminDropDownMenus = [
    {label: "Dashboard", path: "/dashboard/admin"},
    {label: "Manage Items", path: "/dashboard/manage-products"},
    {label: "All Orders", path: "/dashboard/manage-orders"},
    {label: "New Post", path: "/dashboard/add-new-post"},
  ];
  const userDropDownMenus = [
    {label: "Dashboard", path: "/dashboard"},
    {label: "Profile", path: "/dashboard/profile"},
    {label: "Payments", path: "/dashboard/payments"},
    {label: "Orders", path: "/dashboard/orders"},
  ];
  const dropDownMenu = user?.role === 'admin' ?[...adminDropDownMenus]:[...userDropDownMenus]

  const handleLogout = async () => {
    try {
     await logoutUser().unwrap();
     dispatch(logout())
     navigate('/'); 
    } catch (error) {
      console.error("Failed to log out", error)
      
    }
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
            {
              user && user ? (<>
              <img 
              onClick={handDropDownTogle}
              src={user?.profileImage || avatarImg} alt='' className='size-6 rounded-full cursor-pointer'/>
              {
                isDropDownOpen &&(
                  <div className='absolute right-0 mt-3 p-4 w-48 bg-white border
                   border-gray-200 rounded-lg shadow-lg z-50'>
                    <ul className='font-medium space-y-4 p-2'>
                      {
                        dropDownMenu.map((menu, index) => (
                          <li key={index} >
                            <Link
                            onClick={() => setIsDropDownOpen(false)}
                            className='dropdown-items' to={menu.path}>{menu.label}</Link>
                          </li>
                        ))
                      }
                      <li><Link onClick={handleLogout} className='dropdown-items'>Logout</Link></li>
                    </ul>
                  </div>
                )
              }
                </>):(<Link to="/login">
                <i className="ri-user-line"></i>
              </Link>)
            }
            
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