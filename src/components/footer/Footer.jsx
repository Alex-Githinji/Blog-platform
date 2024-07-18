import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className="footer">
      <div className="icons">
        <a className="facebook">
          <FaFacebook />
        </a>
        <a className="instagram">
          <FaInstagram />
        </a>
        <a className="twitter">
          <FaTwitter />
        </a>
        <a className="linkedin">
          <FaLinkedin />
        </a>
      </div>
      <div className="copyright">
        <p>Copyright &copy; 2020 all rights reserved</p>
      </div>
    </section>
  );
}
export default Footer;