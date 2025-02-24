import React, { useEffect, useRef } from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { LuLayoutList } from "react-icons/lu";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navRef = useRef();
  const user = useSelector((state) => state.user);
  const wishlist = useSelector((state) => state.wishlist.wishlistData.length);

  return (
    <div ref={navRef}>
      <nav className="nav">
        <div className="logo">
          <Link to="/">
            <h1>
              Stay<span>.com</span>
            </h1>
          </Link>
        </div>
        <div className="nav-tabs">
          <div className="navs">
            <ul className="navigators">
              <li>
                <Link
                  className="nav-item list"
                  to="/list-your-properties"
                  aria-label="List your properties"
                >
                  <LuLayoutList className="list-icon" />
                  List Your Properties
                </Link>
              </li>
              <li>
                <Link
                  className="nav-item contact"
                  to="/contacts"
                  aria-label="Contact support"
                >
                  <BiSupport className="support-icon" />
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div className="auth">
            {user.id && (
              <>
                <Link to="/wishlists" className="wishlist">
                  <MdFavorite className="wishlistIcon" /> Wishlist
                  <div className="favoriteCount">{wishlist}</div>
                </Link>
              </>
            )}
            <Link
              to={user.id ? `/profile/${user.id}` : "/login"}
              className="auth-link"
              aria-label={
                user.id ? `Profile of ${user.name}` : "Login/Register"
              }
            >
              <FaUser />
              {user.id ? user.name : "Login/Register"}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
