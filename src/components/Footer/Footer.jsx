import React from "react";
import "./Footer.css";

import { IoLogoFacebook } from "react-icons/io";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaPinterestSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="sec1">
        <div className="part1">
          <h4>About</h4>
          <ul>
            <li>About Us</li>
            <li>How We Work</li>
            <li>Contact Us</li>
            <li>Support</li>
            <li>Career</li>
            <li>Sitemap</li>
          </ul>
        </div>
        <div className="part2">
          <h4>Quick Links</h4>
          <ul>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Disclaimer</li>
            <li>Refund and Cancellation Policy</li>
            <li>Blog</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="part3">
          <h4>Get in Touch</h4>
          <ul>
            <li>admin@stay.com</li>
            <li>+91 7759892024</li>
          </ul>
        </div>
        <div className="part4">
          <h4>Follow Us</h4>
          <p className="follow-slogen">
            Follow & Subscribe your email to get
            <br />
            new business tips.
          </p>
          <form action="#">
            <input type="text" placeholder="Enter Email Address" />
            <button type="submit">Send</button>
          </form>
          <div className="socials">
            <IoLogoFacebook />
            <FaSquareTwitter />
            <FaSquareInstagram />
            <FaLinkedin />
            <FaPinterestSquare />
          </div>
        </div>
      </div>
      <div className="sec2">
        <p>© 2024 StudentCosy. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
